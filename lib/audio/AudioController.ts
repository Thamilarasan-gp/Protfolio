// Web Audio API ambient alpine mountain wind & cinematic dynamic audio synthesizer
// Zero external mp3 dependencies, 100% reliable, zero load failure

class AudioController {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private lfoGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private hasImpactTriggered: boolean = false;

  public init() {
    if (this.ctx || typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isEnabled) {
      this.stop();
      this.isEnabled = false;
    } else {
      this.start();
      this.isEnabled = true;
    }

    return this.isEnabled;
  }

  public getState(): boolean {
    return this.isEnabled;
  }

  private start() {
    if (!this.ctx) return;

    // Create 5-second buffer of pink/white noise for gentle mountain breeze
    const bufferSize = this.ctx.sampleRate * 5;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filtering
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Resonant lowpass filter to mimic mountain wind whistling through peaks
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // LFO to create natural wind gust oscillation
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // gentle breathing cycle

    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    // Master volume gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.22, this.ctx.currentTime + 2.0);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.noiseNode.start();
    this.lfo.start();
  }

  private stop() {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
          this.lfo?.stop();
          this.lfo?.disconnect();
        } catch (e) {
          // ignore
        }
      }, 900);
    }
  }

  // Modulate wind pitch and volume based on scroll speed / dive velocity
  public updateScrollDynamics(progress: number, velocity: number) {
    if (!this.isEnabled || !this.ctx || !this.filterNode || !this.gainNode) return;

    // During dive (progress 0.15 - 0.7), wind rush intensifies
    const isDiving = progress > 0.15 && progress < 0.82;
    const baseFreq = isDiving ? 480 : 300;
    const speedBoost = Math.min(1800, Math.abs(velocity) * 450);

    const targetFreq = baseFreq + speedBoost;
    const targetGain = Math.min(0.45, 0.18 + (isDiving ? 0.15 : 0) + Math.min(0.15, Math.abs(velocity) * 0.1));

    this.filterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.15);

    // Trigger impact thump when reaching landing zone (progress > 0.88)
    if (progress > 0.88 && !this.hasImpactTriggered) {
      this.playLandingImpact();
      this.hasImpactTriggered = true;
    } else if (progress < 0.8) {
      this.hasImpactTriggered = false;
    }
  }

  // Superhero landing subsonic impact boom
  public playLandingImpact() {
    if (!this.isEnabled || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(28, this.ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.75);
  }
}

export const audioController = new AudioController();
