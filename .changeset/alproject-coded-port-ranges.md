---
"@paleo/alproject": major
---

Changed the projects marker's `portRange` to a `portRanges` array with optional codes and descriptions. Select a coded range with `free-ports --range <code>`, and repeat `init --port-range [<code>=]<first>-<last>` to declare ranges.
