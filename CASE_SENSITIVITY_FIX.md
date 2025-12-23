# Fixing Git Case Sensitivity Issues

## Problem

When deploying to Netlify (Linux), the build failed with:

```
error TS2307: Cannot find module './NavbarList' or its corresponding type declarations.
```

**Root Cause:**

- Git tracked files as `NavBarItem.tsx` and `NavBarList.tsx` (capital B)
- Local filesystem showed `NavbarItem.tsx` and `NavbarList.tsx` (lowercase b)
- macOS filesystem is **case-insensitive**, so both names worked locally
- Linux (Netlify) filesystem is **case-sensitive**, so it couldn't find the files
- Git on macOS ignores case-only renames, so the change wasn't detected

## Solution Steps

### Step 1: Check what Git is tracking vs what exists locally

```bash
# See what Git tracks
git ls-files src/components/ | grep -i nav

# See what actually exists on filesystem
ls -la src/components/ | grep -i nav
```

**Result:**

- Git tracked: `NavBarItem.tsx`, `NavBarList.tsx` (capital B)
- Filesystem: `NavbarItem.tsx`, `NavbarList.tsx` (lowercase b)

### Step 2: Use intermediate filename trick to force Git rename

Because Git on macOS ignores case-only renames, we need to use an intermediate filename:

```bash
# For NavBarItem.tsx → NavbarItem.tsx
git mv src/components/NavBarItem.tsx src/components/_temp_navbaritem.tsx
git mv src/components/_temp_navbaritem.tsx src/components/NavbarItem.tsx

# For NavBarList.tsx → NavbarList.tsx
git mv src/components/NavBarList.tsx src/components/_temp_navbarlist.tsx
git mv src/components/_temp_navbarlist.tsx src/components/NavbarList.tsx
```

**Why this works:**

- First `git mv` renames to a completely different name (forces Git to track the change)
- Second `git mv` renames to the final lowercase name (Git sees this as a new rename)
- Git now properly tracks the case change

### Step 3: Verify the changes

```bash
# Check Git status
git status

# Should show:
# renamed:    src/components/NavBarItem.tsx -> src/components/NavbarItem.tsx
# renamed:    src/components/NavBarList.tsx -> src/components/NavbarList.tsx
```

### Step 4: Ensure imports match the new filenames

Check that all imports use the correct case:

```bash
# Check imports in Header.tsx
grep -i "NavbarList\|NavBarList" src/components/Header.tsx

# Check imports in NavbarList.tsx
grep -i "NavbarItem\|NavBarItem" src/components/NavbarList.tsx
```

**Expected:**

- `Header.tsx`: `import { NavbarList } from "./NavbarList";`
- `NavbarList.tsx`: `import { NavbarItem } from "./NavbarItem";`

### Step 5: Test the build locally

```bash
# Clean build cache
rm -rf .tsbuildinfo node_modules/.tmp

# Run build
yarn build
```

**Expected:** Build should succeed without TypeScript errors

### Step 6: Commit and push

```bash
git add src/components/NavbarItem.tsx src/components/NavbarList.tsx
git commit -m "fix: rename NavBar files to Navbar for case consistency"
git push
```

## Alternative Solution (If you prefer capital B)

If you want to keep `NavBarItem` and `NavBarList` (capital B), you would:

1. Update imports to match:

   ```typescript
   // Header.tsx
   import { NavbarList } from "./NavBarList";

   // NavBarList.tsx
   import { NavBarItem } from "./NavBarItem";
   ```

2. Ensure filesystem matches Git (already done if Git has capital B)

## Key Takeaways

1. **macOS is case-insensitive** - File renames that only change case may not be detected by Git
2. **Linux is case-sensitive** - Netlify will fail if filenames don't match exactly
3. **Use intermediate filenames** - When renaming case-only, use `git mv` with an intermediate name
4. **Always verify** - Check `git ls-files` to see what Git actually tracks
5. **Keep imports consistent** - Ensure import paths match the actual filenames in Git

## Prevention

To avoid this issue in the future:

1. **Be consistent with naming** - Choose one convention (camelCase, PascalCase) and stick to it
2. **Check Git before committing** - Use `git ls-files` to verify what Git tracks
3. **Test on Linux** - If possible, test builds on a Linux environment or CI/CD before deploying
4. **Use Git config** - You can configure Git to be case-sensitive:
   ```bash
   git config core.ignorecase false
   ```
   (Note: This can cause issues on macOS, so use with caution)

## Verification Commands

After fixing, verify everything is correct:

```bash
# 1. Check what Git tracks
git ls-files src/components/ | grep -i nav

# 2. Check what exists on filesystem
ls -la src/components/ | grep -i nav

# 3. Check imports match
grep -r "from.*Navbar\|from.*NavBar" src/

# 4. Test build
yarn build

# 5. Check Git status
git status
```

All should be consistent!
