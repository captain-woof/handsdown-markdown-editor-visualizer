<p align="center">
  <img width="150" height="150" src="https://drive.google.com/uc?export=download&id=1vkPo6PHKzK49ScFXkw0iU6o5rU9Exchx">
</p>

# Handsdown - Markdown Editor & Visualizer

![GitHub top language](https://img.shields.io/github/languages/top/sohail-saha/handsdown-markdown-editor-visualizer?color=%23fcf51c) ![GitHub release (latest by date)](https://img.shields.io/github/downloads/sohail-saha/handsdown-markdown-editor-visualizer/latest/total) [![Node.js CI](https://github.com/sohail-saha/handsdown-markdown-editor-visualizer/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/sohail-saha/handsdown-markdown-editor-visualizer/actions/workflows/node.js.yml)

### Table of Contents
- **[Introduction](#introduction)**
- **[Features](#features)**
- **[Usage](#usage)**
- **[Building from source](#building-from-source)**

### Introduction

Handsdown is a cross-platform markdown editor and visualizer, all rolled into one. Use it to take notes, create READMEs, basically whatever you use markdowns for. 

### Features

<p align="center">
  <img width="501.5" height="280.5" src="https://drive.google.com/uc?export=download&id=1SCVpPyp4IiKSyEzSzzD8krF-hwYqADDC">
</p>

- Edit and simultaneously see your markdown visualized, side-by-side.
- The handy file explorer to the left helps to quickly switch between multiple files in the current directory (changeable).
- Cross-platform, so yeah, use it wherever, on all of your workstations.

### Installing

Simply go to the [releases](https://github.com/sohail-saha/handsdown-markdown-editor-visualizer) page, lookup the version that suits your system platform and architecture, download it, and install it.

### Building from source

Building from the source is easy. Open `package.json`, and look at the `scripts` entry. **There will be make scripts for each platform and each architecture.** For example, the `make-linux-x64` script builds **only** for Linux-x64. Note the script that corresponds to the platform you need to build for.

*Note: The `make-all` script builds for all platforms, architectures and formats, sequentially.*

Once you've chosen your desired script name, run:

```bash
yarn
yarn run make-PLATFORM-ARCH
```

That's it.

### Author

**Sohail Saha**

![Twitter Follow](https://img.shields.io/twitter/follow/sohail_saha_?style=social)
