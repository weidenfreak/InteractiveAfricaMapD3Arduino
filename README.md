Interactive Africa Map D3 Arduino
=============================

A prototype to visualise data from the Worldbank, this time using an Arduino, Sinatra and WebSockets. Instead of just using normal inputs like mouse and keyboard the slider in this [InteractiveAfricaMapD3](https://github.com/weidenfreak/InteractiveAfricaMapD3) reacts to movements from an Arduino potentiometer.

Initially based on [eventmachine-websockets-demo](https://github.com/stewart/eventmachine-websockets-demo).

See  for standalone version without Arduino and Websockets.

Setup
------
* Connect your Arduino via USB (no Ethernet Shield needed)
* Set up a single Potentiometer input on your breadboard
* Load Arduino [Potentiometer Code](https://github.com/weidenfreak/InteractiveAfricaMapD3Arduino/blob/master/Arduino/Potentiometer/Potentiometer.ino) on your Arduino.
* Start the Sinatra App: 
```
ruby app.rb
```


