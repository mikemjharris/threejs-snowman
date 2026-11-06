Snowball Fight
==============

A snowball fight in three.js, at [snowman.mikemjharris.com](https://snowman.mikemjharris.com).

A static site: the game runs entirely in the browser, and top scores are kept in the player's own browser.
It used to run on a Node server with socket.io for a shared leaderboard; the multiplayer version is on the
`old-multiplayer` branch.

```
npm install
npm run build    # static files in dist/
npm start        # build, then serve dist/ on http://localhost:8000
```

Pushing to `master` deploys to S3 + CloudFront with GitHub Actions
(infrastructure in [mikemjharris/infra](https://github.com/mikemjharris/infra)).
