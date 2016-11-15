# scrollyaan

`Scrollyaan` is a lightweight script for firing callback when -

  - A HTML element appear on screen/ viewport.
  - the user has scrolled particular pixels.(currently, support only in Y direction)

# Usage
  load script in your HTML page.

```html
//scrollyaan script file
<script src="file_location/scrollyaan.min.js"></script>

```
## options
scrollyaan currently have two option's


### inViewport
inViewport is a function, For any element of which a callback should be fire when appearing in screen or viewport.

```javascript
scrollyaan.inViewport(element , callback , offset , iteration );
```
<table>
<tr><td>element</td><td> a valid dom element or target. </td></tr>
<tr><td>callback </td><td> a callback function. </td></tr>
<tr><td>offset </td><td>  a number between 1 to 100 which define distance in parcentage  from top of viewport.</td></tr>
<tr><td>iteration </td><td> a boolean value which define callback should be fire each it appear on viewport or not.</td></tr>
</table>

### atIndex
 for adding a location at which callback should be fire.
 ```javascript
 scrollyaan.atIndex(pixels , callback);
 ```
 <table>
 <tr><td>pixels</td><td>a number which define distance in pixel from top of the whole page(not viewport).</td></tr>
 <tr><td>callback</td><td> a callback function</td></tr>
</table>
