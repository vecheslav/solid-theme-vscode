const fs = require('fs');
const path = require('path');
const chroma = require('chroma-js')

const _ = chroma;

const syntax = {
  // tag: _('#39BAE6').desaturate(.4).darken(.2),
  // func: _('#FFB454'),
  // entity: _('#59C2FF').desaturate(.2).darken(.3),
  // string: _('#C2D94C').desaturate(.4).darken(.3),
  // regexp: _('#95E6CB'),
  // markup: _('#F07178'),
  // keyword: _('#FF8F40'),
  // special: _('#E6B673'),
  // comment: _('#626A73'),
  // constant: _('#FFEE99').desaturate(.2).darken(.3),
  // operator: _('#F29668'),
  // error: _('#FF3333').brighten(1).desaturate(0.2)
  tag: _('#55aed1'),
  func: _('#ffb454'),
  entity: _('#56b2e9'),
  string: _('#b5c94e'),
  regexp: _('#95e6cb'),
  markup: _('#f07178'),
  keyword: _('#ff8f40'),
  special: _('#e6b673'),
  comment: _('#626a73'),
  constant: _('#eedf92'),
  operator: _('#f29668'),
  error: _('#fb7262')
}

const vcs = {
  added: _('#91B362').saturate(.2),
  modified: _('#6994BF').saturate(.2),
  removed: _('#D96C75').saturate(.2)
}

const common = {
  accent: _('#0089b9'),
  bg: _('#161719'),
  fg: _('#e6e1cf'),
  white: _('#ffffff'),
  ui: _('#8c8e94'),
}

const ui = {
  fg: common.ui,
  line: _('#27282c'),
  panel: {
    bg: _('#1b1c1f'),
    hg: _('#1c1d1f'),
    shadow: _('#000000'),
    path: _('#54575e'),
    row: _('#242529'),
    // row: _('#212226')
  },
  gutter: {
    normal: _('#44464c')
  },
  selection: {
    bg: _('#373940')
  },
  guide: {
    normal: _('#2a2d33'),
    active: _('#4b4f59')
  }
}

const scheme = {
  common,
  syntax,
  vcs,
  ui
}

const terminalColors = {
  black: scheme.ui.line.hex(),
  white: '#c7c7c7',
  brightBlack: '#686868',
  brightWhite: '#ffffff'
}

createTheme()

function createTheme() {
  const filepath = path.join(__dirname, `/solid-dark.json`);
  const theme = JSON.parse(fs.readFileSync(filepath));

  theme.colors = getThemeColors();
  theme.tokenColors = getTokenColors();
  // console.log(tokenColors);

  fs.writeFileSync(filepath, JSON.stringify(theme, null, '\t'));
  console.log(`Updated ${filepath}`);
}

function getThemeColors() {
  return {
    // Colour reference https://code.visualstudio.com/docs/getstarted/theme-color-reference

    // CONTRAST COLOURS
    // --

    // BASE COLOURS
    'focusBorder': scheme.ui.fg.alpha(.54).hex(),
    'foreground': scheme.ui.fg.hex(),
    'widget.shadow': scheme.ui.panel.shadow.alpha(.4).hex(),
    'selection.background': scheme.ui.selection.bg.alpha(.99).hex(),
    'icon.foreground': scheme.ui.fg.hex(),
    'errorForeground': scheme.syntax.error.hex(),
    'descriptionForeground': scheme.ui.fg.hex(),

    // TEXT COLOURS
    'textBlockQuote.background': scheme.ui.panel.bg.hex(),
    'textLink.foreground': scheme.common.accent.hex(),
    'textLink.activeForeground': scheme.common.accent.hex(),
    'textPreformat.foreground': scheme.common.fg.hex(),

    // BUTTON CONTROL
    'button.background': scheme.common.accent.alpha(.67).hex(),
    'button.foreground': scheme.common.white.hex(),
    'button.hoverBackground': scheme.common.accent.alpha(.73).hex(),

    // DROPDOWN CONTROL
    'dropdown.background': scheme.ui.panel.bg.hex(),

    // INPUT CONTROL
    'input.background': scheme.ui.panel.bg.darken(.15).hex(),
    'input.border': scheme.ui.fg.alpha(.2).hex(),
    'input.foreground': scheme.common.fg.hex(),
    'input.placeholderForeground': scheme.ui.fg.alpha(.54).hex(),
    'inputOption.activeBorder': scheme.ui.fg.alpha(.54).hex(),
    'inputValidation.errorBackground': scheme.common.bg.hex(),
    'inputValidation.errorBorder': scheme.syntax.error.hex(),
    'inputValidation.infoBackground': scheme.common.bg.hex(),
    'inputValidation.infoBorder': scheme.syntax.tag.hex(),
    'inputValidation.warningBackground': scheme.common.bg.hex(),
    'inputValidation.warningBorder': scheme.syntax.func.hex(),

    // SCROLLBAR CONTROL
    'scrollbar.shadow': scheme.ui.panel.shadow.alpha(.07).hex(),
    'scrollbarSlider.background': scheme.common.white.alpha(.07).hex(),
    'scrollbarSlider.hoverBackground': scheme.common.white.alpha(.13).hex(),
    'scrollbarSlider.activeBackground': scheme.common.white.alpha(.13).hex(),

    // BADGE
    'badge.background': scheme.ui.panel.path.hex(),
    'badge.foreground': scheme.common.white.hex(),

    // PROGRESS BAR
    'progressBar.background': scheme.common.accent.hex(),

    // LISTS AND TREES
    'list.focusAndSelectionBackground': scheme.ui.line.hex(),
    'list.focusAndSelectionForeground': scheme.common.fg.hex(),
    'list.activeSelectionBackground': scheme.ui.line.hex(),
    'list.activeSelectionForeground': scheme.common.fg.hex(),
    'list.inactiveSelectionBackground': scheme.common.bg.hex(),
    'list.inactiveSelectionForeground': scheme.common.fg.hex(),
    'list.focusBackground': scheme.ui.panel.row.hex(),
    'list.focusForeground': scheme.common.fg.hex(),
    'list.hoverBackground': scheme.ui.panel.row.hex(),
    'list.hoverForeground': scheme.common.fg.hex(),
    'list.highlightForeground': scheme.common.accent.hex(),

    // 'list.errorForeground': scheme.vcs.removed.hex(),
    // 'tree.indentGuidesStroke': scheme.ui.guide.active.hex(),

    // 'listFilterWidget.background': scheme.ui.panel.bg.hex(),
    // 'listFilterWidget.outline': scheme.common.accent.hex(),
    // 'listFilterWidget.noMatchesOutline': scheme.syntax.error.hex(),
    // 'list.filterMatchBorder': scheme.common.accent.hex(),
    // 'list.filterMatchBackground': scheme.common.accent.alpha(.05).hex(),

    // ACTIVITY BAR
    'activityBar.background': scheme.common.bg.hex(),
    'activityBar.foreground': scheme.ui.fg.alpha(.8).hex(),
    'activityBar.border': scheme.ui.line.hex(),
    // 'activityBar.activeBorder': scheme.common.accent.alpha(.8).hex(),
    'activityBarBadge.background': scheme.ui.guide.active.hex(),
    'activityBarBadge.foreground': scheme.common.white.hex(),

    // SIDE BAR
    'sideBar.background': scheme.common.bg.hex(),
    'sideBar.border': scheme.ui.line.hex(),
    'sideBarTitle.foreground': scheme.ui.fg.hex(),
    'sideBarSectionHeader.background': scheme.ui.panel.hg.hex(),
    'sideBarSectionHeader.foreground': scheme.ui.fg.hex(),

    // EDITOR GROUPS & TABS
    'editorGroup.border': scheme.ui.line.hex(),
    'editorGroup.background': scheme.ui.panel.bg.hex(),
    'editorGroupHeader.noTabsBackground': scheme.common.bg.hex(),
    'editorGroupHeader.tabsBackground': scheme.common.bg.hex(),
    'editorGroupHeader.tabsBorder': scheme.ui.line.hex(),
    'tab.activeBackground': scheme.ui.panel.bg.hex(),
    'tab.activeForeground': scheme.common.fg.hex(),
    'tab.border': scheme.ui.line.hex(),
    'tab.activeBorder': scheme.ui.fg.hex(),
    'tab.unfocusedActiveBorder': scheme.ui.fg.hex(),
    'tab.inactiveBackground': scheme.common.bg.hex(),
    'tab.inactiveForeground': scheme.ui.fg.hex(),
    'tab.unfocusedActiveForeground': scheme.common.fg.alpha(.67).hex(),
    'tab.unfocusedInactiveForeground': scheme.ui.fg.hex(),
    'tab.unfocusedActiveBorder': scheme.ui.fg.hex(),

    // EDITOR
    'editor.background': scheme.common.bg.hex(),
    'editor.foreground': scheme.common.fg.hex(),
    'editorLineNumber.foreground': scheme.ui.gutter.normal.hex(),
    // 'editorLineNumber.activeForeground': scheme.ui.gutter.active.hex(),
    'editorCursor.foreground': scheme.common.white.hex(),

    'editor.selectionBackground': scheme.ui.selection.bg.hex(),

    'editor.wordHighlightBackground': scheme.common.accent.alpha(.28).hex(),
    'editor.wordHighlightStrongBackground': scheme.common.accent.alpha(.28).hex(),

    'editor.findMatchBackground': scheme.common.accent.alpha(.28).hex(),
    'editor.findMatchHighlightBackground': scheme.common.accent.alpha(.28).hex(),
    'editor.findRangeHighlightBackground': scheme.common.accent.alpha(.28).hex(),

    // 'editor.hoverHighlightBackground': '',

    'editor.lineHighlightBackground': scheme.ui.panel.hg.hex(),
    // 'editor.lineHighlightBorder': '',

    'editorLink.activeForeground': scheme.common.accent.hex(),

    'editor.rangeHighlightBackground': scheme.ui.panel.hg.hex(),

    'editorWhitespace.foreground': scheme.ui.gutter.normal.hex(),

    'editorIndentGuide.background': scheme.ui.gutter.normal.hex(),

    'editorRuler.foreground': scheme.ui.line.hex(),
    // 'editorCodeLens.foreground': scheme.syntax.comment.hex(),

    // 'editorBracketMatch.background': scheme.ui.gutter.normal.alpha(.3).hex(),
    'editorBracketMatch.border': scheme.ui.gutter.normal.hex(),

    // OVERVIEW RULER
    'editorOverviewRuler.border': scheme.ui.line.hex(),
    'editorOverviewRuler.modifiedForeground': scheme.vcs.modified.alpha(.6).hex(),
    'editorOverviewRuler.addedForeground': scheme.vcs.added.alpha(.6).hex(),
    'editorOverviewRuler.deletedForeground': scheme.vcs.removed.alpha(.6).hex(),
    'editorOverviewRuler.errorForeground': scheme.syntax.error.hex(),
    'editorOverviewRuler.warningForeground': scheme.common.accent.hex(),

    // ERRORS AND WARNINGS
    'editorError.foreground': scheme.syntax.error.hex(),
    'editorWarning.foreground': scheme.common.accent.hex(),

    // GUTTER
    'editorGutter.modifiedBackground': scheme.vcs.modified.alpha(.6).hex(),
    'editorGutter.addedBackground': scheme.vcs.added.alpha(.6).hex(),
    'editorGutter.deletedBackground': scheme.vcs.removed.alpha(.6).hex(),

    // DIFF EDITOR
    'diffEditor.insertedTextBackground': scheme.vcs.added.alpha(.1).hex(),
    'diffEditor.removedTextBackground': scheme.vcs.removed.alpha(.1).hex(),

    // EDITOR WIDGET
    'editorWidget.background': scheme.ui.panel.bg.hex(),
    'editorSuggestWidget.background': scheme.ui.panel.bg.hex(),
    'editorSuggestWidget.border': scheme.ui.line.hex(),
    'editorSuggestWidget.highlightForeground': scheme.common.accent.hex(),
    'editorSuggestWidget.selectedBackground': scheme.ui.panel.row.hex(),
    'editorHoverWidget.background': scheme.ui.panel.bg.hex(),
    'editorHoverWidget.border': scheme.ui.line.hex(),

    // DEBUG EXCEPTION
    'debugExceptionWidget.border': scheme.ui.line.hex(),
    'debugExceptionWidget.background': scheme.ui.panel.bg.hex(),

    // EDITOR MARKER
    'editorMarkerNavigation.background': scheme.ui.panel.bg.hex(),

    // PEEK VIEW
    'peekView.border': scheme.ui.line.hex(),
    'peekViewEditor.background': scheme.ui.panel.bg.hex(),
    'peekViewEditor.matchHighlightBackground': scheme.common.accent.alpha(.28).hex(),
    'peekViewResult.background': scheme.ui.panel.bg.hex(),
    'peekViewResult.fileForeground': scheme.ui.fg.hex(),
    'peekViewResult.matchHighlightBackground': scheme.common.accent.alpha(.28).hex(),
    'peekViewTitle.background': scheme.ui.panel.bg.hex(),
    'peekViewTitleDescription.foreground': scheme.ui.fg.hex(),
    'peekViewTitleLabel.foreground': scheme.ui.fg.hex(),

    // Merge Conflicts
    // 'merge.currentHeaderBackground': '?',
    // 'merge.currentContentBackground': '?',
    // 'merge.incomingHeaderBackground': '?',
    // 'merge.incomingContentBackground': '?',
    // 'merge.border': '?',
    // 'merge.commonContentBackground': '?',
    // 'merge.commonHeaderBackground': '?',
    // 'editorOverviewRuler.currentContentForeground': '?',
    // 'editorOverviewRuler.incomingContentForeground': '?',
    // 'editorOverviewRuler.commonContentForeground': '?',

    // Panel
    'panel.background': scheme.common.bg.hex(),
    'panel.border': scheme.ui.line.hex(),
    'panelTitle.activeBorder': scheme.common.accent.hex(),
    'panelTitle.activeForeground': scheme.common.fg.hex(),
    'panelTitle.inactiveForeground': scheme.ui.fg.hex(),

    // STATUS BAR
    'statusBar.foreground': scheme.ui.fg.hex(),
    'statusBar.background': scheme.ui.panel.bg.hex(),
    'statusBar.border': scheme.ui.line.hex(),
    'statusBar.noFolderBackground': scheme.ui.panel.bg.hex(),
    'statusBar.debuggingBackground': scheme.ui.panel.bg.hex(),
    'statusBar.debuggingForeground': scheme.ui.fg.hex(),
    'statusBarItem.activeBackground': scheme.ui.line.hex(),
    'statusBarItem.hoverBackground': scheme.ui.panel.row.hex(),
    'statusBarItem.prominentBackground': scheme.ui.line.hex(),
    'statusBarItem.prominentHoverBackground': scheme.ui.panel.row.hex(),

    // TITLE BAR
    'titleBar.activeBackground': scheme.common.bg.hex(),
    'titleBar.activeForeground': scheme.common.fg.hex(),
    'titleBar.inactiveBackground': scheme.common.bg.hex(),
    'titleBar.inactiveForeground': scheme.ui.fg.hex(),
    'titleBar.border': scheme.ui.line.hex(),

    // MENU BAR
    // 'menubar.selectionForeground': '?',
    // 'menubar.selectionBackground': '?',
    // 'menubar.selectionBorder': '?',
    // 'menu.foreground': '?',
    // 'menu.background': '?',
    // 'menu.selectionForeground': '?',
    // 'menu.selectionBackground': '?',
    // 'menu.selectionBorder': '?',

    // NOTIFICATION
    'notificationCenterHeader.background': scheme.ui.panel.row.hex(),
    // 'notifications.background': scheme.panel.bg.hex(),
    // 'notificationCenter.border': '?',
    // 'notificationCenterHeader.foreground': '?',
    // 'notificationToast.border': '?',
    // 'notifications.foreground': '?',
    // 'notifications.border': '?',
    // 'notificationLink.foreground': '?',

    // EXTENSIONS
    'extensionButton.prominentBackground': scheme.common.accent.alpha(.67).hex(),
    'extensionButton.prominentHoverBackground': scheme.common.accent.alpha(.73).hex(),
    'extensionButton.prominentForeground': scheme.common.white.hex(),


    // QUICK PICKER
    'pickerGroup.border': scheme.ui.line.hex(),
    'pickerGroup.foreground': scheme.common.accent.hex(),

    // DEBUG
    'debugToolBar.background': scheme.ui.panel.bg.hex(),
    // 'debugToolBar.border': '',

    // WELCOME PAGE
    // 'welcomePage.buttonBackground': '?'
    // 'welcomePage.buttonHoverBackground': '?'
    'walkThrough.embeddedEditorBackground': scheme.ui.panel.bg.hex(),

    // GIT
    'gitDecoration.modifiedResourceForeground': scheme.vcs.modified.alpha(.7).hex(),
    'gitDecoration.deletedResourceForeground': scheme.vcs.removed.alpha(.7).hex(),
    'gitDecoration.untrackedResourceForeground': scheme.vcs.added.alpha(.7).hex(),
    'gitDecoration.ignoredResourceForeground': scheme.ui.fg.alpha(.5).hex(),
    'gitDecoration.conflictingResourceForeground': '',
    'gitDecoration.submoduleResourceForeground': scheme.syntax.constant.alpha(.7).hex(),

    // Settings
    // 'settings.headerForeground': scheme.common.fg.hex(),
    // 'settings.modifiedItemIndicator': scheme.vcs.modified.hex(),

    // TERMINAL
    'terminal.background': scheme.common.bg.hex(),
    'terminal.foreground': scheme.common.fg.hex(),
    'terminal.ansiBlack': terminalColors.black,
    'terminal.ansiRed': scheme.syntax.markup.darken(.1).hex(),
    'terminal.ansiGreen': scheme.syntax.string.darken(.1).hex(),
    'terminal.ansiYellow': scheme.syntax.func.darken(.1).hex(),
    'terminal.ansiBlue': scheme.syntax.entity.darken(.1).hex(),
    'terminal.ansiMagenta': scheme.syntax.constant.darken(.1).hex(),
    'terminal.ansiCyan': scheme.syntax.regexp.darken(.1).hex(),
    'terminal.ansiWhite': terminalColors.white,
    'terminal.ansiBrightBlack': terminalColors.brightBlack,
    'terminal.ansiBrightRed': scheme.syntax.markup.hex(),
    'terminal.ansiBrightGreen': scheme.syntax.string.hex(),
    'terminal.ansiBrightYellow': scheme.syntax.func.hex(),
    'terminal.ansiBrightBlue': scheme.syntax.entity.hex(),
    'terminal.ansiBrightMagenta': scheme.syntax.constant.hex(),
    'terminal.ansiBrightCyan': scheme.syntax.regexp.hex(),
    'terminal.ansiBrightWhite': terminalColors.brightWhite
  }
}

function getTokenColors() {
  return [
    {
      'settings': {
        'background': scheme.common.bg,
        'foreground': scheme.common.fg
      }
    },
    {
      'name': 'Comment',
      'scope': ['comment'],
      'settings': {
        'fontStyle': 'italic',
        'foreground': scheme.syntax.comment.hex()
      }
    },


    {
      'name': 'String',
      'scope': ['string', 'constant.other.symbol'], //+
      'settings': {
        'foreground': scheme.syntax.string.hex()
      }
    },
    {
      'name': 'Regular Expressions and Escape Characters',
      'scope': ['string.regexp', 'constant.character', 'constant.other'],
      'settings': {
        'foreground': scheme.syntax.regexp.hex()
      }
    },


    {
      'name': 'Number',
      'scope': ['constant.numeric'],
      'settings': {
        'foreground': scheme.common.accent.hex()
      }
    },
    {
      'name': 'Built-in constants',
      'scope': ['constant.language'],
      'settings': {
        'foreground': scheme.common.accent.hex()
      }
    },


    {
      'name': 'Variable',
      'scope': ['variable'],
      'settings': {
        'foreground': scheme.common.fg.hex()
      }
    },
    {
      'name': 'Member Variable',
      'scope': ['variable.member'],
      'settings': {
        'foreground': scheme.syntax.markup.hex()
      }
    },
    {
      'name': 'Language variable',
      'scope': ['variable.language'],
      'settings': {
        'fontStyle': 'italic',
        'foreground': scheme.syntax.tag.hex()
      }
    },


    // ------
    // Keywords
    {
      'name': 'Storage',
      'scope': ['storage'],
      'settings': {
        'foreground': scheme.syntax.keyword.hex()
      }
    },
    {
      'name': 'Keyword',
      'scope': ['keyword'],
      'settings': {
        'foreground': scheme.syntax.keyword.hex()
      }
    },


    // ------
    // Operators
    {
      'name': 'Operators',
      'scope': ['keyword.operator'],
      'settings': {
        'foreground': scheme.syntax.operator.hex()
      }
    },


    // ------
    // Punctuation
    {
      'name': 'Separators like ; or ,',
      'scope': ['punctuation.separator', 'punctuation.terminator'],
      'settings': {
        'foreground': scheme.common.fg.alpha(.7).hex()
      }
    },
    {
      'name': 'Punctuation',
      'scope': ['punctuation.section'],
      'settings': {
        'foreground': scheme.common.fg.hex()
      }
    },
    {
      'name': 'Accessor',
      'scope': ['punctuation.accessor'],
      'settings': {
        'foreground': scheme.syntax.operator.hex()
      }
    },


    // ------
    // Types
    {
      'name': 'Types fixes',
      'scope': [
        'source.java storage.type',
        'source.haskell storage.type',
        'source.c storage.type',
      ],
      'settings': {
        'foreground': scheme.syntax.entity.hex()
      }
    },
    {
      'name': 'Inherited class type',
      'scope': ['entity.other.inherited-class'],
      'settings': {
        'foreground': scheme.syntax.tag.hex()
      }
    },
    // Fixes
    {
      'name': 'Lambda arrow',
      'scope': ['storage.type.function'],
      'settings': {
        'foreground': scheme.syntax.keyword.hex()
      }
    },
    {
      'name': 'Java primitive variable types',
      'scope': ['source.java storage.type.primitive'],
      'settings': {
        'foreground': scheme.syntax.tag.hex()
      }
    },


    // ------
    // Function/method names in definitions
    // and calls
    {
      'name': 'Function name',
      'scope': ['entity.name.function'],
      'settings': {
        'foreground': scheme.syntax.func.hex()
      }
    },
    {
      'name': 'Function arguments',
      'scope': ['variable.parameter', 'meta.parameter'],
      'settings': {
        'foreground': scheme.syntax.constant.hex()
      }
    },
    {
      'name': 'Function call',
      'scope': [
        'variable.function',
        'variable.annotation',
        'meta.function-call.generic',
        'support.function.go'
      ],
      'settings': {
        'foreground': scheme.syntax.func.hex()
      }
    },
    {
      'name': 'Library function',
      'scope': ['support.function', 'support.macro'],
      'settings': {
        'foreground': scheme.syntax.markup.hex()
      }
    },


    // ------
    // Import/export paths
    {
      'name': 'Imports and packages',
      'scope': ['entity.name.import', 'entity.name.package'],
      'settings': {
        'foreground': scheme.syntax.string.hex()
      }
    },
    {
      'name': 'Entity name',
      'scope': ['entity.name'],
      'settings': {
        'foreground': scheme.syntax.entity.hex()
      }
    },

    // Tag and their attributes
    {
      'name': 'Tag',
      'scope': ['entity.name.tag', 'meta.tag.sgml'],
      'settings': {
        'foreground': scheme.syntax.tag.hex()
      }
    },
    {
      'name': 'Tag start/end',
      'scope': [
        'punctuation.definition.tag.end',
        'punctuation.definition.tag.begin',
        'punctuation.definition.tag'
      ],
      'settings': {
        'foreground': scheme.syntax.tag.alpha(.5).hex()
      }
    },
    {
      'name': 'Tag attribute',
      'scope': ['entity.other.attribute-name'],
      'settings': {
        'foreground': scheme.syntax.func.hex()
      }
    },


    {
      'name': 'Library constant',
      'scope': ['support.constant'],
      'settings': {
        'fontStyle': 'italic',
        'foreground': scheme.syntax.operator.hex()
      }
    },
    {
      'name': 'Library class/type',
      'scope': ['support.type', 'support.class', 'source.go storage.type'],
      'settings': {
        'foreground': scheme.syntax.tag.hex()
      }
    },
    {
      'name': 'Decorators/annotation',
      'scope': [
        'meta.decorator variable.other',
        'meta.decorator punctuation.decorator',
        'storage.type.annotation'
      ],
      'settings': {
        'foreground': scheme.syntax.special.hex()
      }
    },
    {
      'name': 'Invalid',
      'scope': ['invalid'],
      'settings': {
        'foreground': scheme.syntax.error.hex()
      }
    },
    {
      'name': 'diff.header',
      'scope': ['meta.diff', 'meta.diff.header'],
      'settings': {
        'foreground': '#c594c5'
      }
    },
    {
      'name': 'Ruby class methods',
      'scope': ['source.ruby variable.other.readwrite'],
      'settings': {
        'foreground': scheme.syntax.func.hex()
      }
    },
    {
      'name': 'CSS tag names',
      'scope': [
        'source.css entity.name.tag',
        'source.sass entity.name.tag',
        'source.scss entity.name.tag',
        'source.less entity.name.tag',
        'source.stylus entity.name.tag'
      ],
      'settings': {
        'foreground': scheme.syntax.entity.hex()
      }
    },
    {
      'name': 'CSS browser prefix',
      'scope': [
        'source.css support.type',
        'source.sass support.type',
        'source.scss support.type',
        'source.less support.type',
        'source.stylus support.type'
      ],
      'settings': {
        'foreground': scheme.syntax.comment.hex()
      }
    },
    {
      'name': 'CSS Properties',
      'scope': ['support.type.property-name'],
      'settings': {
        'fontStyle': 'normal',
        'foreground': scheme.syntax.tag.hex()
      }
    },
    {
      'name': 'Search Results Nums',
      'scope': ['constant.numeric.line-number.find-in-files - match'],
      'settings': {
        'foreground': scheme.syntax.comment.hex()
      }
    },
    {
      'name': 'Search Results Match Nums',
      'scope': ['constant.numeric.line-number.match'],
      'settings': {
        'foreground': scheme.syntax.keyword.hex()
      }
    },
    {
      'name': 'Search Results Lines',
      'scope': ['entity.name.filename.find-in-files'],
      'settings': {
        'foreground': scheme.syntax.string.hex()
      }
    },
    {
      'scope': ['message.error'],
      'settings': {
        'foreground': scheme.syntax.error.hex()
      }
    },
    {
      'name': 'Markup heading',
      'scope': ['markup.heading', 'markup.heading entity.name'],
      'settings': {
        'fontStyle': 'bold',
        'foreground': scheme.syntax.string.hex()
      }
    },
    {
      'name': 'Markup links',
      'scope': ['markup.underline.link', 'string.other.link'],
      'settings': {
        'foreground': scheme.syntax.tag.hex()
      }
    },
    {
      'name': 'Markup Italic',
      'scope': ['markup.italic'],
      'settings': {
        'fontStyle': 'italic',
        'foreground': scheme.syntax.markup.hex()
      }
    },
    {
      'name': 'Markup Bold',
      'scope': ['markup.bold'],
      'settings': {
        'fontStyle': 'bold',
        'foreground': scheme.syntax.markup.hex()
      }
    },
    {
      'name': 'Markup Bold/italic',
      'scope': ['markup.italic markup.bold', 'markup.bold markup.italic'],
      'settings': {
        'fontStyle': 'bold italic'
      }
    },
    {
      'name': 'Markup Code',
      'scope': ['markup.raw'],
      'settings': {
        'background': scheme.common.fg.alpha(.02).hex()
      }
    },
    {
      'name': 'Markup Code Inline',
      'scope': ['markup.raw.inline'],
      'settings': {
        'background': scheme.common.fg.alpha(.06).hex()
      }
    },
    {
      'name': 'Markdown Separator',
      'scope': ['meta.separator'],
      'settings': {
        'fontStyle': 'bold',
        'background': scheme.common.fg.alpha(.06).hex(),
        'foreground': scheme.syntax.comment.hex()
      }
    },
    {
      'name': 'Markup Blockquote',
      'scope': ['markup.quote'],
      'settings': {
        'foreground': scheme.syntax.regexp.hex(),
        'fontStyle': 'italic'
      }
    },
    {
      'name': 'Markup List Bullet',
      'scope': ['markup.list punctuation.definition.list.begin'],
      'settings': {
        'foreground': scheme.syntax.func.hex()
      }
    },
    {
      'name': 'Markup added',
      'scope': ['markup.inserted'],
      'settings': {
        'foreground': scheme.vcs.added.hex()
      }
    },
    {
      'name': 'Markup modified',
      'scope': ['markup.changed'],
      'settings': {
        'foreground': scheme.vcs.modified.hex()
      }
    },
    {
      'name': 'Markup removed',
      'scope': ['markup.deleted'],
      'settings': {
        'foreground': scheme.vcs.removed.hex()
      }
    },
    {
      'name': 'Markup Strike',
      'scope': ['markup.strike'],
      'settings': {
        'foreground': scheme.syntax.special.hex()
      }
    },
    {
      'name': 'Markup Table',
      'scope': ['markup.table'],
      'settings': {
        'background': scheme.common.fg.alpha(.06).hex(),
        'foreground': scheme.syntax.tag.hex()
      }
    },
    {
      'name': 'Markup Raw Inline',
      'scope': ['text.html.markdown markup.inline.raw'],
      'settings': {
        'foreground': scheme.syntax.operator.hex()
      }
    },
    {
      'name': 'Markdown - Line Break',
      'scope': ['text.html.markdown meta.dummy.line-break'],
      'settings': {
        'background': scheme.syntax.comment.hex(),
        'foreground': scheme.syntax.comment.hex()
      }
    },
    {
      'name': 'Markdown - Raw Block Fenced',
      'scope': ['punctuation.definition.markdown'],
      'settings': {
        'background': scheme.common.fg.hex(),
        'foreground': scheme.syntax.comment.hex()
      }
    }
  ];
}
