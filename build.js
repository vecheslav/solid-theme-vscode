const fs = require('fs');
const path = require('path');
const chroma = require('chroma-js')

// From ayu legacy
// 0.35
// 1.06

const solid = (color, saturationPercent = 0.35, huePercent = 1.06) => {
  const hsv = chroma(color).hsv();
  hsv[0] *= huePercent;
  hsv[1] *= saturationPercent;
  return chroma(...hsv, 'hsv').hex()
}

// 0.9
const syntax = (color, darkenValue = 0.9) => {
  return chroma(color).darken(darkenValue).hex()
}

const scheme = {
  "common": {
    "bg": "#161719",
    "fg": "#e6e1cf",
    "accent": "#0089b9",
    "white": "#ebecf0"
  },
  "ui": {
    "fg": "#8c8e94",
    "panel": {
      "bg": "#1b1c1f",
      "shadow": "#000000",
      "pathFg": "#54575e",
      "rowBg": "#212326"
    },
    "folder": {
      "normal": "#505259"
    },
    "scrollbar": {
      "puck": "#ffffff"
    },
    "gridDivider": "#27282c",
    "minimap": "100, 100, 100",
    "opacity": "0.3"
  },
  "syntax": {
    "error": "#c9000e",
    "lineHg": "#1c1d1f",
    "gutter": "#44464c",
    "selection": "#373940",
    "stackGuide": "#2a2d33",
    "activeGuide": "#4b4f59",
    "tag": "#0089b9",
    "func": "#cd8929",
    "regexp": "#69b99f",
    "string": "#94ac19",
    "supVar": "#bf4551",
    "keyword": "#cb4c01",
    "esSpec": "#b78b4a",
    "comment": "#6b6d73",
    "constant": "#d0c16e",
    "operator": "#b79a14"
  }
}

const terminalColors = {
  background: scheme.common.bg,
  foreground: scheme.common.fg,
  black: scheme.ui.gridDivider, // ayu-vim uses #0f1419
  red: scheme.syntax.keyword,
  green: scheme.syntax.string,
  yellow: scheme.syntax.func,
  blue: scheme.syntax.tag,
  magenta: '#ca30c7',
  cyan: scheme.syntax.regexp,
  white: '#c7c7c7',
  brightBlack: '#686868',
  brightRed: scheme.syntax.supVar,
  brightGreen: '#cbe645',
  brightYellow: scheme.syntax.constant,
  brightBlue: '#6871ff',
  brightMagenta: '#ff77ff',
  brightCyan: '#a6fde1',
  brightWhite: '#ffffff'
};

createTheme()

function createTheme() {
  const filepath = path.join(__dirname, `/solid-dark.json`);
  const theme = JSON.parse(fs.readFileSync(filepath));

  theme.colors = getThemeColors();

  fs.writeFileSync(filepath, JSON.stringify(theme, null, '\t'));
  console.log(`Updated ${filepath}`);
}

function getThemeColors() {
  return {
    // ----- Base colors -----
    'foreground': scheme.ui.fg,
    'focusBorder': `${scheme.ui.fg}8A`,
    // 'contrastBorder': '',
    // 'contrastActiveBorder': '',

    'widget.shadow': `${scheme.ui.panel.shadow}80`,

    'badge.background': scheme.ui.panel.pathFg,
    'badge.foreground': '#fff',

    'progressBar.background': scheme.common.accent,

    'input.background': scheme.ui.panel.bg,
    'input.foreground': scheme.common.fg,
    'input.border': `${scheme.ui.fg}4C`,
    'input.placeholderForeground': `${scheme.ui.fg}8A`,

    'inputOption.activeBorder': `${scheme.ui.fg}8A`,

    'inputValidation.infoBackground': scheme.common.bg,
    'inputValidation.infoBorder': scheme.syntax.tag,
    'inputValidation.warningBackground': scheme.common.bg,
    'inputValidation.warningBorder': scheme.syntax.func,
    'inputValidation.errorBackground': scheme.common.bg,
    'inputValidation.errorBorder': scheme.syntax.error,

    'dropdown.background': scheme.ui.panel.bg,
    // 'dropdown.foreground': '',
    // 'dropdown.border': '',

    'list.focusAndSelectionBackground': scheme.ui.gridDivider,
    'list.focusAndSelectionForeground': scheme.common.fg,
    'list.activeSelectionBackground': scheme.ui.gridDivider,
    'list.activeSelectionForeground': scheme.common.fg,
    'list.inactiveSelectionBackground': scheme.common.bg,
    'list.inactiveSelectionForeground': scheme.common.fg,
    'list.focusBackground': scheme.ui.panel.rowBg,
    'list.focusForeground': scheme.common.fg,
    'list.hoverBackground': scheme.ui.panel.rowBg,
    'list.hoverForeground': scheme.common.fg,
    // 'list.dropBackground': '',
    'list.highlightForeground': scheme.common.accent,

    'pickerGroup.foreground': scheme.common.accent,
    'pickerGroup.border': scheme.ui.gridDivider,

    'button.background': `${scheme.common.accent}AA`,
    'button.hoverBackground': `${scheme.common.accent}BB`,
    'button.foreground': '#fff',

    'scrollbar.shadow': `${scheme.ui.panel.shadow}11`,
    'scrollbarSlider.background': `${scheme.ui.scrollbar.puck}11`,
    'scrollbarSlider.hoverBackground': `${scheme.ui.scrollbar.puck}22`,
    'scrollbarSlider.activeBackground': `${scheme.ui.scrollbar.puck}22`,

    // See http://stackoverflow.com/a/7224621 for the semi-transparent issue workaround
    'selection.background': `${scheme.syntax.selection}fd`,

    // ----- Editor -----
    'editor.background': scheme.common.bg,
    'editor.foreground': scheme.common.fg,
    'editor.selectionBackground': scheme.syntax.selection,
    // 'editor.inactiveSelectionBackground': '',
    // 'editor.selectionHighlightBackground': '',
    'editor.findMatchBackground': `${scheme.common.accent}48`,
    'editor.findMatchHighlightBackground': `${scheme.common.accent}48`,
    'editor.findRangeHighlightBackground': `${scheme.common.accent}48`,
    'editorLink.activeForeground': scheme.common.accent,
    'editorLink.foreground': scheme.common.accent,
    'editorWidget.background': scheme.ui.panel.bg,
    'editor.lineHighlightBackground': scheme.syntax.lineHg,
    // 'editor.lineHighlightBorder': '',
    'editor.rangeHighlightBackground': scheme.syntax.lineHg,
    'editor.wordHighlightBackground': `${scheme.common.accent}48`,
    'editor.wordHighlightStrongBackground': `${scheme.common.accent}48`,
    'editorCursor.foreground': scheme.common.white,
    'editorWhitespace.foreground': scheme.syntax.gutter,
    'editorIndentGuide.background': scheme.syntax.gutter,
    'editorLineNumber.foreground': scheme.syntax.gutter,
    // 'editorMarkerNavigationError.background': '',
    // 'editorMarkerNavigationWarning.background': '',
    'editorMarkerNavigation.background': scheme.ui.panel.bg,
    // 'editor.hoverHighlightBackground': '',
    'editorHoverWidget.background': scheme.ui.panel.bg,
    'editorHoverWidget.border': scheme.ui.gridDivider,
    // 'editorBracketMatch.background': '',
    'editorBracketMatch.border': scheme.syntax.gutter,
    'editorOverviewRuler.border': scheme.ui.gridDivider,
    'editorOverviewRuler.errorForeground': scheme.syntax.error,
    'editorOverviewRuler.warningForeground': scheme.common.accent,
    'editorRuler.foreground': scheme.ui.gridDivider,

    // ----- Editor error squiggles -----
    // 'editorError.border': '',
    'editorError.foreground': scheme.syntax.error,
    // 'editorWarning.border': '',
    'editorWarning.foreground': scheme.common.accent,

    // ----- Editor gutter -----
    // 'editorGutter.background': '',
    'editorGutter.modifiedBackground': scheme.syntax.tag,
    'editorGutter.addedBackground': scheme.syntax.string,
    'editorGutter.deletedBackground': scheme.syntax.error,

    // ----- Editor suggest -----
    'editorSuggestWidget.background': scheme.ui.panel.bg,
    'editorSuggestWidget.border': scheme.ui.gridDivider,
    // 'editorSuggestWidget.foreground': '',
    'editorSuggestWidget.selectedBackground': scheme.ui.panel.rowBg,
    'editorSuggestWidget.highlightForeground': scheme.common.accent,

    // ----- Peek view editor -----
    'peekView.border': scheme.ui.gridDivider,
    'peekViewEditor.background': scheme.ui.panel.bg,
    'peekViewEditor.matchHighlightBackground': `${scheme.common.accent}48`,
    // 'peekViewEditorGutter.background': ''
    'peekViewTitle.background': scheme.ui.panel.bg,
    'peekViewTitleLabel.foreground': scheme.ui.fg,
    'peekViewTitleDescription.foreground': scheme.ui.fg,
    'peekViewResult.background': scheme.ui.panel.bg,
    // 'peekViewResult.selectionBackground': '',
    // 'peekViewResult.selectionForeground': '',
    'peekViewResult.matchHighlightBackground': `${scheme.common.accent}48`,
    'peekViewResult.fileForeground': scheme.ui.fg,
    // 'peekViewResult.lineForeground': '',

    //  ----- Diff editor -----
    'diffEditor.insertedTextBackground': `${scheme.syntax.regexp}44`,
    'diffEditor.removedTextBackground': `${scheme.syntax.supVar}44`,
    // 'diffEditor.insertedTextBorder': '',
    // 'diffEditor.removedTextBorder': '',

    // ----- Workbench: editor group -----
    'editorGroup.background': scheme.ui.panel.bg,
    'editorGroup.border': scheme.ui.gridDivider,
    // 'editorGroup.dropBackground': '',
    'editorGroupHeader.tabsBackground': scheme.common.bg,
    'editorGroupHeader.noTabsBackground': scheme.common.bg,
    "editorGroupHeader.tabsBorder": scheme.ui.gridDivider,

    // ----- Workbench: tabs -----
    'tab.activeBackground': scheme.ui.panel.bg,
    'tab.inactiveBackground': scheme.common.bg,
    'tab.activeForeground': scheme.common.fg,
    'tab.activeBorder': scheme.ui.fg,
    'tab.inactiveForeground': scheme.ui.fg,
    'tab.border': scheme.ui.gridDivider,
    'tab.unfocusedActiveForeground': `${scheme.common.fg}AA`,
    'tab.unfocusedInactiveForeground': scheme.ui.fg,
    'tab.unfocusedActiveBorder': scheme.ui.fg,

    // ----- Workbench: panel -----
    'panel.background': scheme.common.bg,
    'panel.border': scheme.ui.gridDivider,
    'panelTitle.activeForeground': scheme.common.fg,
    'panelTitle.inactiveForeground': scheme.ui.fg,
    'panelTitle.activeBorder': scheme.common.accent,

    // ----- Workbench: status bar -----
    'statusBar.foreground': scheme.ui.fg,
    'statusBar.background': scheme.ui.panel.bg,
    'statusBar.border': scheme.ui.gridDivider,
    'statusBar.noFolderBackground': scheme.ui.panel.bg,
    'statusBar.debuggingBackground': scheme.ui.panel.bg,
    'statusBar.debuggingForeground': scheme.ui.fg,
    'statusBarItem.activeBackground': scheme.ui.gridDivider,
    'statusBarItem.hoverBackground': scheme.ui.panel.rowBg,
    'statusBarItem.prominentBackground': scheme.ui.gridDivider,
    'statusBarItem.prominentHoverBackground': scheme.ui.panel.rowBg,

    // ----- Workbench: activity bar -----
    'activityBar.background': scheme.common.bg,
    'activityBar.foreground': scheme.ui.fg,
    'activityBar.border': scheme.ui.gridDivider,
    // 'activityBar.dropBackground': '',
    'activityBarBadge.background': scheme.syntax.activeGuide,
    'activityBarBadge.foreground': '#fff',

    // ----- Workbench: side bar -----
    'sideBar.background': scheme.common.bg,
    'sideBarTitle.foreground': scheme.ui.fg,
    'sideBarSectionHeader.background': scheme.syntax.lineHg,
    'sideBarSectionHeader.foreground': scheme.ui.fg,
    'sideBar.border': scheme.ui.gridDivider,

    // ----- Workbench: title bar -----
    'titleBar.activeForeground': scheme.ui.fg,
    'titleBar.inactiveForeground': scheme.ui.fg,
    'titleBar.activeBackground': scheme.common.bg,
    'titleBar.inactiveBackground': scheme.common.bg,
    'titleBar.border': scheme.ui.gridDivider,

    // ----- Workbench: notifications -----
    // 'notification.foreground': '',
    'notification.background': scheme.ui.gridDivider,

    // ----- Workbench: extension buttons -----
    'extensionButton.prominentBackground': `${scheme.common.accent}AA`,
    'extensionButton.prominentHoverBackground': `${scheme.common.accent}BB`,
    'extensionButton.prominentForeground': '#fff',

    // ----- Workbench: welcome page / interactive playground -----
    'welcomePage.quickLinkBackground': scheme.ui.panel.rowBg,
    'welcomePage.quickLinkHoverBackground': scheme.ui.gridDivider,
    'welcomeOverlay.foreground': scheme.common.fg,
    // 'welcomeOverlay.background': '',
    'walkThrough.embeddedEditorBackground': scheme.ui.panel.bg,
    'textLink.foreground': scheme.common.accent,
    'textLink.activeForeground': scheme.common.accent,
    'textPreformat.foreground': scheme.common.fg,
    'textBlockQuote.background': scheme.ui.panel.bg,
    // 'textBlockQuote.border': '',
    // 'textCodeBlock.background: '',

    // ----- Workbench: debug -----
    'debugExceptionWidget.border': scheme.ui.gridDivider,
    'debugExceptionWidget.background': scheme.ui.panel.bg,
    'debugToolBar.background': scheme.ui.panel.bg,

    // ----- Workbench: terminal -----
    'terminal.background': terminalColors.background,
    'terminal.foreground': terminalColors.foreground,
    'terminal.ansiBlack': terminalColors.black,
    'terminal.ansiRed': terminalColors.red,
    'terminal.ansiGreen': terminalColors.green,
    'terminal.ansiYellow': terminalColors.yellow,
    'terminal.ansiBlue': terminalColors.blue,
    'terminal.ansiMagenta': terminalColors.magenta,
    'terminal.ansiCyan': terminalColors.cyan,
    'terminal.ansiWhite': terminalColors.white,
    'terminal.ansiBrightBlack': terminalColors.brightBlack,
    'terminal.ansiBrightRed': terminalColors.brightRed,
    'terminal.ansiBrightGreen': terminalColors.brightGreen,
    'terminal.ansiBrightYellow': terminalColors.brightYellow,
    'terminal.ansiBrightBlue': terminalColors.brightBlue,
    'terminal.ansiBrightMagenta': terminalColors.brightMagenta,
    'terminal.ansiBrightCyan': terminalColors.brightCyan,
    'terminal.ansiBrightWhite': terminalColors.brightWhite
  };
}
