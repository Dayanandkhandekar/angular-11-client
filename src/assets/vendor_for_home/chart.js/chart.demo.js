lighten: function any(ratio) {
    var hsl = this.values.hsl;
    hsl[2] += hsl[2] * ratio;
    this.setValues('hsl', hsl);
    return this;
}

darken: function any (ratio) {
    var hsl = this.values.hsl;
    hsl[2] -= hsl[2] * ratio;
    this.setValues('hsl', hsl);
    return this;
}