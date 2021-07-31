import serial
import sys
# from serial import Serial

ser=serial.Serial("COM1",9600,timeout=2, xonxoff=False, rtscts=False, dsrdtr=False)

ser.flushInput()
ser.flushOutput()

while True:
    
    data=ser.readline()
    pdata = data.rstrip("\n\r")
    print(pdata)
    if len(str(pdata)) >0:
        sys.stdout.flush()
    else:
        ser.flushInput()
        ser.flushOutput()
