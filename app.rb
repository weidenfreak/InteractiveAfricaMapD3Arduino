require 'thin'
require 'em-websocket'
require 'sinatra/base'
require 'serialport'
require 'active_support/all'


EM.run do
  class App < Sinatra::Base
    get '/' do
      erb :index
    end
  end

  @clients = []

  sp = SerialPort.new('/dev/cu.usbmodemfd121', 9600, 8, 1, SerialPort::NONE)


  EM::WebSocket.start(:host => '0.0.0.0', :port => '3001') do |ws|
    ws.onopen do |handshake|
      @clients << ws
      ws.send "Connected to #{handshake.path}."
    end

    ws.onclose do
      ws.send "Closed."
      @clients.delete ws
    end

    ws.onmessage do |msg|
      puts "Received Message: #{msg}"

      @clients.each do |socket|
        socket.send message_from(sp).to_json
      end
    end

    def message_from(sp)
      message = sp.gets
      message.chop!

      { "event" => message }
    end
  end

  App.run! :port => 3000
end
