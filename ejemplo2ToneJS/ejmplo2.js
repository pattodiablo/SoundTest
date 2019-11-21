(function() {
  // Membrane Synth https://tonejs.github.io/docs/r12/MembraneSynth
  const synth = new Tone.MembraneSynth().toMaster();
  function playSynth() {
    synth.triggerAttackRelease("C2", "8n");
  }

  /**
   * Play Controls
   */
  document.querySelector("body").addEventListener("click", function() {
    playSynth();
  });
})();
