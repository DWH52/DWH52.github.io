const int analogInPin = A0;
const int ledPin = 12;

int sensorValue = 0;
int outputValue = 0;

void setup()
{
  Serial.begin(57600);
  
  pinMode(ledPin, OUTPUT);
}

void loop()
{
  sensorValue = analogRead(analogInPin); // potentiometer
  
  while(Serial.available() > 0)
  {
    int lightToggle = Serial.parseInt();
    
    if(Serial.read() == '\n')
    {
      if(lightToggle == '1')
      {
        digitalWrite(ledPin, HIGH);
      }
      else
      {
        digitalWrite(ledPin, LOW);
      }
    }
  }
  
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  
  Serial.println(outputValue);
}
