<CsoundSynthesizer>
<CsOptions>
-n -d -odac
</CsOptions>
<CsInstruments>
; Initialize the global variables. 
sr= 44100 
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
aSin oscils 0dbfs/4, 440, 5
     out    aSin
     
endin

</CsInstruments>
<CsScore>
i 1 0 2

</CsScore>
</CsoundSynthesizer>