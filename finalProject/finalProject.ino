#define VRX_PIN A0
#define SW_PIN 2

int joyX = 0, sw = 0;

const int numReadings = 10;

int xReadings[numReadings];  // the readings from the analog input
int readIndex = 0;          // the index of the current reading
float xTotal = 0;              // the running total
float xAverage = 0;            // the average
float xStart;
bool start = false;
unsigned long lastTime = 0;
const int interval = 16;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(SW_PIN, INPUT_PULLUP);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT); 

  for(int i = 0; i < numReadings; i++) {
    xReadings[i] = 0;
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  int x = analogRead(VRX_PIN);
  int sw = digitalRead(SW_PIN);

  xTotal = xTotal - xReadings[readIndex];
  // read from the sensor:
  xReadings[readIndex] = x;
  // add the reading to the total:
  xTotal = xTotal + x;
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // calculate the average:
  xAverage = xTotal / numReadings;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    readIndex = 0;
    if (!start) {
      xStart = xAverage;
      start = true;
    }
  }

  if (start) {
    unsigned long now = millis();
    if (now - lastTime > interval) {
      Serial.print((int) (xAverage-xStart));
      Serial.print(",");
      Serial.println(!sw);
      lastTime = now;
    }
  }

//Reading input from script
  while(Serial.available() > 0)
  {
    int lightIndicator = Serial.parseInt();
    
    if(Serial.read() == '\n')
    {
      if(lightIndicator == 1)
      {
        digitalWrite(12, HIGH);
      }
      if(lightIndicator == 2)
      {
        digitalWrite(11, HIGH);
      }
      if(lightIndicator == 3)
      {
        digitalWrite(10, HIGH);
      }
      if(lightIndicator == 0)
      {
        digitalWrite(12, LOW);
        digitalWrite(11, LOW);
        digitalWrite(10, LOW);
      }
    }
  }
}