export default class Rating {
  constructor(id, engagement, energy, inFlow, date, activity) {
    this.id = id;
    this.engagement = engagement;
    this.energy = energy;
    this.inFlow = inFlow;
    this.date = date;
    this.activity = activity;
  }
  getId() {
    return this.id;
  }
  getEngagement() {
    return this.engagement;
  }
  getEnergy() {
    return this.energy;
  }
  getInFlow() {
    return this.inFlow;
  }
  getDate() {
    return this.date;
  }
  getActivity() {
    return this.activity;
  }
}
