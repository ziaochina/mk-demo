<!-- File generated from "src/FixedDataTableNew.react.js" -->
`Table` (component)
===================

Data grid component with fixed or scrollable header and columns.

The layout of the data table is as follows:

```
+---------------------------------------------------+
| Fixed Column Group    | Scrollable Column Group   |
| Header                | Header                    |
|                       |                           |
+---------------------------------------------------+
|                       |                           |
| Fixed Header Columns  | Scrollable Header Columns |
|                       |                           |
+-----------------------+---------------------------+
|                       |                           |
| Fixed Body Columns    | Scrollable Body Columns   |
|                       |                           |
+-----------------------+---------------------------+
|                       |                           |
| Fixed Footer Columns  | Scrollable Footer Columns |
|                       |                           |
+-----------------------+---------------------------+
```

- Fixed Column Group Header: These are the headers for a group
  of columns if included in the table that do not scroll
  vertically or horizontally.

- Scrollable Column Group Header: The header for a group of columns
  that do not move while scrolling vertically, but move horizontally
  with the horizontal scrolling.

- Fixed Header Columns: The header columns that do not move while scrolling
  vertically or horizontally.

- Scrollable Header Columns: The header columns that do not move
  while scrolling vertically, but move horizontally with the horizontal
  scrolling.

- Fixed Body Columns: The body columns that do not move while scrolling
  horizontally, but move vertically with the vertical scrolling.

- Scrollable Body Columns: The body columns that move while scrolling
  vertically or horizontally.

Props
-----

### `width`

Pixel width of table. If all columns do not fit,
a horizontal scrollbar will appear.

type: `custom`


### `height`

Pixel height of table. If all rows do not fit,
a vertical scrollbar will appear.

Either `height` or `maxHeight` must be specified.

type: `custom`


### `maxHeight`

Maximum pixel height of table. If all rows do not fit,
a vertical scrollbar will appear.

Either `height` or `maxHeight` must be specified.

type: `custom`


### `ownerHeight`

Pixel height of table's owner, this is used in a managed scrolling
situation when you want to slide the table up from below the fold
without having to constantly update the height on every scroll tick.
Instead, vary this property on scroll. By using `ownerHeight`, we
over-render the table while making sure the footer and horizontal
scrollbar of the table are visible when the current space for the table
in view is smaller than the final, over-flowing height of table. It
allows us to avoid resizing and reflowing table when it is moving in the
view.

This is used if `ownerHeight < height` (or `maxHeight`).

type: `custom`


### `overflowX`

type: `custom`


### `overflowY`

type: `custom`


### `rowsCount`

Number of rows in the table.

type: `custom`


### `rowHeight`

Pixel height of rows unless `rowHeightGetter` is specified and returns
different value.

type: `custom`


### `rowHeightGetter`

If specified, `rowHeightGetter(index)` is called for each row and the
returned value overrides `rowHeight` for particular row.

type: `custom`


### `rowClassNameGetter`

To get any additional CSS classes that should be added to a row,
`rowClassNameGetter(index)` is called.

type: `custom`


### `groupHeaderHeight`

Pixel height of the column group header.

type: `custom`
defaultValue: `0`


### `headerHeight`

Pixel height of header.

type: `custom`
defaultValue: `0`


### `footerHeight`

Pixel height of footer.

type: `custom`
defaultValue: `0`


### `scrollLeft`

Value of horizontal scroll.

type: `custom`
defaultValue: `0`


### `scrollToColumn`

Index of column to scroll to.

type: `custom`


### `scrollTop`

Value of vertical scroll.

type: `custom`
defaultValue: `0`


### `scrollToRow`

Index of row to scroll to.

type: `custom`


### `onScrollStart`

Callback that is called when scrolling starts with current horizontal
and vertical scroll values.

type: `custom`


### `onScrollEnd`

Callback that is called when scrolling ends or stops with new horizontal
and vertical scroll values.

type: `custom`


### `onContentHeightChange`

Callback that is called when `rowHeightGetter` returns a different height
for a row than the `rowHeight` prop. This is necessary because initially
table estimates heights of some parts of the content.

type: `custom`


### `onRowClick`

Callback that is called when a row is clicked.

type: `custom`


### `onRowDoubleClick`

Callback that is called when a row is double clicked.

type: `custom`


### `onRowMouseDown`

Callback that is called when a mouse-down event happens on a row.

type: `custom`


### `onRowMouseEnter`

Callback that is called when a mouse-enter event happens on a row.

type: `custom`


### `onRowMouseLeave`

Callback that is called when a mouse-leave event happens on a row.

type: `custom`


### `onColumnResizeEndCallback`

Callback that is called when resizer has been released
and column needs to be updated.

Required if the isResizable property is true on any column.

```
function(
  newColumnWidth: number,
  columnKey: string,
)
```

type: `custom`


### `isColumnResizing`

Whether a column is currently being resized.

type: `custom`

