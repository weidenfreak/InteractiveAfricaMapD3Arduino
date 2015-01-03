Interactive Africa Map D3 Arduino
=============================

A prototype to visualise data from the Worldbank, this time using an Arduino, Sinatra and WebSockets. Instead of just using normal inputs like mouse and keyboard, the slider in this application reacts to movements from an Arduino potentiometer.

Initially based on [eventmachine-websockets-demo](https://github.com/stewart/eventmachine-websockets-demo) and [Web Interfacing with Arduino](http://viget.com/extend/web-interfacing-with-arduino).

See [InteractiveAfricaMapD3](https://github.com/weidenfreak/InteractiveAfricaMapD3) for a standalone version without Arduino and Websockets.

Setup
------
* Set up a single potentiometer input on your breadboard. Like here:  [Potentiometer setup](http://www.arduino.cc/en/tutorial/potentiometer)
* Connect your Arduino via USB (no Ethernet Shield needed)
* Load [potentiometer code](https://github.com/weidenfreak/InteractiveAfricaMapD3Arduino/blob/master/Arduino/Potentiometer/Potentiometer.ino) on your Arduino.
* Start the Sinatra app: 
```
> ruby app.rb
```


