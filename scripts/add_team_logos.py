"""Fill in home_logo / away_logo on every game in data/*_dashboard.json.

New games already get their logo straight from ESPN's scoreboard payload (see
the build_*_dashboard.py scripts). This pass covers older games that were
stored before logos existed: it pulls each league's team list from ESPN's
public API once, maps team display name -> logo URL, and fills any game that
is missing one. Never overwrites an existing logo; fails soft so a hiccup on
ESPN's side can't break the daily build.
"""
import json, os, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://site.api.espn.com/apis/site/v2/sports"
LEAGUES = {
    "nfl":    ("football/nfl", ""),
    "nhl":    ("hockey/nhl", ""),
    "mlb":    ("baseball/mlb", ""),
    "nba":    ("basketball/nba", ""),
    "ncaaf":  ("football/college-football", "&groups=80"),
    "ncaamb": ("basketball/mens-college-basketball", "&groups=50"),
}

def fetch_logos(path, extra):
    url = f"{BASE}/{path}/teams?limit=1000{extra}"
    req = urllib.request.Request(url, headers={"User-Agent": "sports-dashboard"})
    with urllib.request.urlopen(req, timeout=30) as r:
        payload = json.load(r)
    out = {}
    for sport in payload.get("sports", []):
        for league in sport.get("leagues", []):
            for t in league.get("teams", []):
                team = t.get("team", t)
                logos = team.get("logos") or []
                href = logos[0].get("href") if logos else None
                for key in (team.get("displayName"), team.get("name")):
                    if key and href:
                        out.setdefault(key, href)
    return out

def walk_games(node):
    if isinstance(node, dict):
        if "home_team" in node and "away_team" in node:
            yield node
        for v in node.values():
            yield from walk_games(v)
    elif isinstance(node, list):
        for v in node:
            yield from walk_games(v)

def main():
    for key, (path, extra) in LEAGUES.items():
        file = os.path.join(ROOT, "data", f"{key}_dashboard.json")
        if not os.path.exists(file):
            continue
        try:
            logos = fetch_logos(path, extra)
        except Exception as exc:  # network / API hiccup -- skip, don't fail the build
            print(f"  {key}: couldn't fetch team logos ({exc}); skipping")
            continue
        with open(file, encoding="utf-8") as fh:
            data = json.load(fh)
        # also reuse any logo already stored on a game for the same team
        known = dict(logos)
        for g in walk_games(data):
            for side in ("home", "away"):
                if g.get(f"{side}_logo"):
                    known.setdefault(g[f"{side}_team"], g[f"{side}_logo"])
        filled = 0
        for g in walk_games(data):
            for side in ("home", "away"):
                if not g.get(f"{side}_logo"):
                    url = known.get(g.get(f"{side}_team"))
                    if url:
                        g[f"{side}_logo"] = url
                        filled += 1
        with open(file, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2, ensure_ascii=False)
        print(f"  {key}: filled {filled} missing logos")

if __name__ == "__main__":
    main()
