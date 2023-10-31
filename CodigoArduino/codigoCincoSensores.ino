#include "DHT.h"
#define dht_type DHT11
int dht_pin = A0;
DHT dht_1 = DHT(dht_pin, dht_type);
int umi_1, umi_2, umi_3, umi_4, umi_5, temp_1, temp_2, temp_3, temp_4, temp_5;

void setup()
{
Serial.begin(9600);
dht_1.begin();
}
void loop()
{
float umidade = dht_1.readHumidity();
float temperatura = dht_1.readTemperature();
umidade = 0.333 * umidade + 36.68;
temperatura = 1.5 * temperatura - 5;

umi_1 = umidade * 1;
umi_2 = umidade * 1.05;
umi_3 = umidade * 1.06;
umi_4 = umidade * 0.97;
umi_5 = umidade * 1.03;
temp_1 = temperatura * 1;
temp_2 = temperatura * 1.05;
temp_3 = temperatura * 1.06;
temp_4 = temperatura * 0.97;
temp_5 = temperatura * 1.03;

if (isnan(temperatura) or isnan(umidade))
{
Serial.println("Erro ao ler o DHT");
}
else
{
Serial.print(umi_1);
Serial.print(";");
Serial.print(temp_1);
Serial.print(";");
Serial.print(umi_2);
Serial.print(";");
Serial.print(temp_2);
Serial.print(";");
Serial.print(umi_3);
Serial.print(";");
Serial.print(temp_3);
Serial.print(";");
Serial.print(umi_3);
Serial.print(";");
Serial.print(temp_4);
Serial.print(";");
Serial.print(umi_5);
Serial.print(";");
Serial.println(temp_5);
}
delay(2000);
}
