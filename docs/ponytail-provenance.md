# Ponytail Skills Provenance & Attribution

This document records the installation, provenance, and attribution of the Ponytail skills in the WMS TRANSPORT Update workspace in accordance with project instructions.

---

## 1. Source Repository & Commit

- **Repository**: `https://github.com/DietrichGebert/ponytail.git`
- **Default Branch**: `main`
- **Commit SHA**: `09c434ab73ca43761c5d8b0c5d341926c2fba710`
- **Installation Date**: 2026-10-27
- **License**: MIT License (Copyright (c) 2026 DietrichGebert)

---

## 2. Installed Files & Destination

Files were copied into the project's recognized skill-discovery directory (`.agent/skills/`), preserving relative paths:

| Source Path (in repository) | Destination Path | Description | Status |
| :--- | :--- | :--- | :--- |
| `skills/ponytail/SKILL.md` | `.agent/skills/ponytail/SKILL.md` | Minimal, high-impact senior dev workflow | Operational (Self-contained) |
| `skills/ponytail-audit/SKILL.md` | `.agent/skills/ponytail-audit/SKILL.md` | Quality & bloat audit instructions | Operational (Self-contained) |
| `skills/ponytail-debt/SKILL.md` | `.agent/skills/ponytail-debt/SKILL.md` | Harvest and ledger for `shortcut:` markers | Operational (Requires `git grep`) |
| `skills/ponytail-gain/SKILL.md` | `.agent/skills/ponytail-gain/SKILL.md` | Measured benchmark impact scoreboard | Operational (Self-contained display; benchmark data hardcoded) |
| `skills/ponytail-help/SKILL.md` | `.agent/skills/ponytail-help/SKILL.md` | Quick reference card for levels and skills | Partially Operational (External host hooks like `/ponytail band` require full CLI plugin setup) |
| `skills/ponytail-review/SKILL.md` | `.agent/skills/ponytail-review/SKILL.md` | Code review and diff safety checks | Operational (Self-contained) |
| `skills/plugin.json` | `.agent/skills/plugin.json` | Skill manifest configuration | Static metadata |

---

## 3. Scope, Exclusions & Dependency Disclosures

In accordance with minimal installation rules:
- **Excluded**: The root `.git` directory, Python package files (`__init__.py`), benchmark raw files (`benchmarks/`), test suites (`tests/`), examples (`examples/`), hooks (`hooks/`), and multi-agent plugins (`.cursor`, `.windsurf`, etc.) were **not** copied into this workspace.
- **Operational Status Note**:
  - Skills `ponytail`, `ponytail-audit`, and `ponytail-review` are fully operational as guidance prompts for code changes and audits.
  - `ponytail-debt` runs standard `git grep` directly on the codebase.
  - `ponytail-help` and `ponytail-gain` reference benchmark files and CLI extensions (such as `pi-extension` or Claude Code band hooks); those platform hooks are not installed, so advanced CLI hook commands are marked incomplete while the core skills remain active and usable.

---

## 4. License Notice

```text
MIT License

Copyright (c) 2026 DietrichGebert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
