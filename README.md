# Chai-Tailwind

A lightweight, vanilla JavaScript utility that applies Tailwind-like utility classes directly to DOM elements at runtime. It is for developers who want rapid, inline styling without a build step or CSS framework dependency.

## Table of Contents

- Description
- Features
- Requirements
- Usage
- Project Structure

## Features

- Parses `chai-*` utility classes on the page and applies corresponding inline styles.
- Supports background colors, borders, padding, margins, text styling, spacing, width/height, display modes, flexbox, and grid utilities.
- Maps shorthand classes such as `chai-bg-red-500`, `chai-p-4`, `chai-text-center`, and `chai-flex-col` to CSS properties.

## Requirements

- A modern browser that supports `document.querySelectorAll` and `performance.now`.

## Usage

Include `ChaiTailwind.js` in your HTML page. The script automatically scans the document for elements with classes matching the `chai-*` pattern and applies styles.

```html
<script src="ChaiTailwind.js"></script>
```

Apply utility classes to any element:

```html
<div class="chai-bg-blue-500 chai-p-4 chai-text-white chai-rounded-lg">
  Styled box
</div>
```

The script logs the total execution time to the console after processing all matching elements.

## Project Structure

| File | Purpose |
|------|---------|
| `ChaiTailwind.js` | Core script that defines style maps and processes `chai-*` classes. |
| `index.html` | Example HTML file demonstrating usage. |