const int analogInPin = A0;
const int ledPin = 13;

int sensorValue = 0;
int outputValue = 0;

const int numReadings = 20;

int readings[numReadings];  // the readings from the analog input
int readIndex = 0;          // the index of the current reading
int total = 0;              // the running total
int average = 0;

void setup()
{
  Serial.begin(4800);
  
  pinMode(ledPin, OUTPUT);
  
  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }
}

void loop()
{
  //
  // subtract the last reading:
  total = total - readings[readIndex];
  // read from the sensor:
  readings[readIndex] = analogRead(analogInPin);
  // add the reading to the total:
  total = total + readings[readIndex];
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    readIndex = 0;
  }

  // calculate the average:
  average = total / numReadings;
  // send it to the computer as ASCII digits
  
  //
  //sensorValue = analogRead(analogInPin); // potentiometer
  outputValue = map(average, 0, 1023, 0, 255);
  
  while(Serial.available() > 0)
  {
    int lightToggle = Serial.parseInt();
    
    Serial.println(outputValue);  
    
    if(Serial.read() == '\n')
    {
      if(lightToggle == 1)
      {
        digitalWrite(ledPin, HIGH);
      }
      else
      {
        digitalWrite(ledPin, LOW);
      }
    }
  }
  
  
}
