# Stitch MCP Setup

Stitch is configured in `.cursor/mcp.json` for this project. Your global config at `~/.cursor/mcp.json` also includes Stitch.

## If Stitch is not appearing in Cursor

1. Open **Cursor Settings → MCP**
2. Confirm **stitch** is listed and enabled
3. **Restart Cursor** (required after adding HTTP MCP servers)
4. In chat, ask: *"List my Stitch projects"* to verify connection

## API Key

The Stitch API key is set in the `X-Goog-Api-Key` header. Generate or rotate keys at [stitch.withgoogle.com](https://stitch.withgoogle.com) project settings.

## What Stitch enables

Once connected, the agent can:

- `generate_screen_from_text` — Create UI designs from prompts
- `fetch_design_md` — Export design system tokens
- `fetch_screen_image` — Download screen screenshots
- `list_projects` / `list_screens` — Browse your Stitch workspace

## Next iteration with Stitch

After MCP is live, we can:

1. Generate a Stitch project aligned to RadAssistPro brand
2. Export `DESIGN.md` into `.stitch/DESIGN.md`
3. Refine layouts using Stitch-generated screens as reference
