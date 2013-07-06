describe("EANx_js 1.0", function () {

    it("should calculate ppo2 for a given depth an o2 fraction", function () {
        expect(EANx_js.ppo2(0, .21)).toBe(.21);
        expect(EANx_js.ppo2(10, .21)).toBe(.42);
        expect(EANx_js.ppo2(20, .36)).toBe(1.08);
    });

    it("should calculate maximum operating depth (mod) for a given ppo2 and mix, rounds down to one decimal", function () {
        expect(EANx_js.mod(1.4, .21)).toBe(56.6);
        expect(EANx_js.mod(1.6, .21)).toBe(66.1);

        expect(EANx_js.mod(1.4, .36)).toBe(28.8);
        expect(EANx_js.mod(1.6, .36)).toBe(34.4);
    });

    it("should calculate no decompression limits for a certain depth and ppo2", function () {
        expect(EANx_js.ndl(18, .21)).toBe(63);
    });

    it("should calculate CNS", function () {
        expect(EANx_js.cns(50, EANx_js.ppo2(21,.32))).toBe(.17);
    });

    it("should calculate best mix for a given depth and partial pressure of oxygen", function () {
        expect(EANx_js.best_mix(30, 1.4)).toBe(.35);
        expect(EANx_js.best_mix(30, 1.6)).toBe(.4);
    });

});