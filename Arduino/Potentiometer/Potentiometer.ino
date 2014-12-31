int inputPin= A0;
int oldValue = 1;
int mappedSensorValue = 0;
int sensorValue = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(inputPin);
  mappedSensorValue = map(sensorValue, 0, 1023, 1990, 2012);
  
  if (mappedSensorValue != oldValue){
    Serial.println(mappedSensorValue);
    oldValue = mappedSensorValue;
  }
  delay(100);
}
