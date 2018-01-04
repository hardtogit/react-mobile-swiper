react-mobile-swiper
================

>a simple react-swiper component 

## get start

#### step one
```bash
clone or down this project
```
#### the second step
```bash
cd example
```
#### the third step
```bash
npm install
```
#### finally
```bash
npm start
```
## how to use

### Example with defaults
#### install
```bash
npm intsall --save react-mobile-swiper
```
#### Creating an example component:
```javascript
var React = require('react');
var Swiper = require('react-mobile-swiper');
var Example = React.createClass({
  render: function() {
    return (
      <Swiper>
       <div></div>
      </Swiper>
    );
  },
});

module.exports = Example;

