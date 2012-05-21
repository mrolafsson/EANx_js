var EANx = (function (eanx) {

    var dsatRDP = [
        [5, 30.42],
        [10, 25.37],
        [20, 20.54],
        [30, 18.34],
        [40, 17.11],
        [60, 15.79],
        [80, 15.11],
        [100, 14.69],
        [120, 14.41],
        [160, 14.06],
        [200, 13.84],
        [240, 13.69],
        [360, 13.45],
        [480, 13.33]
    ];

    var buhlmannZHL16_A = [
        [4.0, 32.4],
        [5.0, 29.6],
        [8.0, 25.4],
        [12.5, 22.5],
        [18.5, 20.3],
        [27.0, 19.0],
        [38.3, 17.8],
        [54.3, 16.8],
        [77.0, 15.9],
        [109.0, 15.2],
        [146, 14.6],
        [187.0, 14.2],
        [239.0, 13.9],
        [305.0, 13.5],
        [390.0, 13.2],
        [498.0, 12.9],
        [635.0, 12.7]
    ];
	
    var buhlmannZHL16_B = [
        [4.0, 32.4],
        [5.0, 29.6],
        [8.0, 25.4],
        [12.5, 22.5],
        [18.5, 20.3],
        [27.0, 19.0],
        [38.3, 17.5],
        [54.3, 16.5],
        [77.0, 15.7],
        [109.0, 15.2],
        [146, 14.6],
        [187.0, 14.2],
        [239.0, 13.9],
        [305.0, 13.4],
        [390.0, 13.2],
        [498.0, 12.9],
        [635.0, 12.7]
    ];

    var slope = {
        5 : -1800, 6 : -1500, 7 : -1200, 8 : -900, 9 : -600, 10 : -600, 11 : -300, 12 : -300, 13 : -300, 14 : -300, 15 : -750, 16 : -750
    };
    var intercept = {
        5 : 1800, 6 : 1620, 7 : 1410, 8 : 1170, 9 : 900, 10 : 900, 11 : 570, 12 : 570, 13 : 570, 14 : 570, 15 : 1245, 16 : 1245
    };

    eanx.ppo2 = function(depth, o2frac) {
        return ((depth() + 10) / 10 * eanx() / 100);
    }

    eanx.bestMix = function(ppo2, depth) {
        return Math.floor((( ppo2 *10 ) / ( parseFloat(depth) + 10 )) * 100);
    }

    eanx.ndl = function(depth, o2frac) {
        var pamb = depth + 10;
        var ndl = 1000;
        var compartments = buhlmannZHL16_B;
        var pi = (pamb - 0.627) * (1 - o2frac / 100);
        var po = (10 - 0.627) * (1 - o2frac / 100);

        for (var i = 0; i < compartments.length; i++) {
            var ht = compartments[i][0];
            var mo = compartments[i][1];

            var k = Math.log(2) / ht;
            if ((pi > mo && mo > po) || (pi < mo && mo < po)) {
                ndl = Math.min((-1 / k) * Math.log((pi - mo) / (pi - po)), ndl);
            }
        }

        return Math.floor(ndl);
    }

    eanx.cns = function(abt, ppo2) {
        var ppo2_to_use = Math.floor(ppo2 * 10 + 0.5);
        return abt / (slope[ppo2_to_use] * ppo2 + intercept[ppo2_to_use]);
    }

    return eanx;

})(EANx || {});