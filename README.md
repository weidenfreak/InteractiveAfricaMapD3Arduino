Interactive Africa Map D3 Arduino
=============================

This is a prototype which was built for a university assignment. The task was to build a prototype that makes use of data from the [World Bank](http://worldbank.org/) and concepts of embodied interaction.

I'm using an Arduino, a Sinatra Ruby app with WebSockets to connect to the Arduino and D3.js to visualise the map.
Instead of using normal inputs like mouse and keyboard, the slider in this application reacts to movements from an Arduino potentiometer.

See [Youtube](https://www.youtube.com/watch?v=qbfOEj78rck) for a very simple video demonstration.

See [InteractiveAfricaMapD3](https://github.com/weidenfreak/InteractiveAfricaMapD3) for a standalone version without Arduino and Websockets.

Initially based on [eventmachine-websockets-demo](https://github.com/stewart/eventmachine-websockets-demo) and [Web Interfacing with Arduino](http://viget.com/extend/web-interfacing-with-arduino).

Setup
------
* Set up a single potentiometer input on your breadboard. Like so:  [Potentiometer setup](http://www.arduino.cc/en/tutorial/potentiometer)
* Connect your Arduino via USB (no Ethernet Shield needed)
* Load [potentiometer code](https://github.com/weidenfreak/InteractiveAfricaMapD3Arduino/blob/master/Arduino/Potentiometer/Potentiometer.ino) on your Arduino.
* You might have to change the address of the serial port in app.rb. Have a look at your port in the Arduino environment to see which one you're using (Tools -> Port).
* Start the Sinatra app: 
```
> ruby app.rb
```


