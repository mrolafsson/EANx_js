$(document).ready(function() {
    $('#ppo2').change(function() {
        calcMod();
        results();
    });
    $('#eanx').change(function() {
        calcMod();
        results();
    });

    $('#depth').change(function() {
        results();
    });
    $('#abt').change(function() {
        results();
    });

    init();
});

function init() {
    calcMod();
    results();
}

function results() {
    var ppo2_at_depth = EANx_js.ppo2(depth(), eanx());
    $('#ppo2_at_depth').val(ppo2_at_depth);

    var cns = EANx_js.cns(abt(), ppo2_at_depth);
    $('#cnsfrac').val(cns);

    $('#ndl').val(ndl().toFixed(0));
    $('#ndl').siblings('span.clock').html(minsToHM(ndl()));
    $('#abt').siblings('span.clock').html(minsToHM(abt()));

    tooLong(ndl() < abt());
    tooDeep(depth() > mod());
}

function calcMod() {
    var mod = ((ppo2() * 10) / (eanx())) - 10;
    $('#mod').val(Math.floor(mod));
}

function ndl() {
    return EANx_js.ndl(depth(), eanx());
}

function ppo2(ppo2) {
    if (ppo2) {
        $('#ppo2').val(ppo2).change();
    }
    return parseFloat($('#ppo2').val());
}

function eanx(eanx) {
    if (eanx) {
        $('#eanx').val(eanx).change();
    }
    return parseInt($('#eanx').val() / 100);
}

function mod(mod) {
    if (mod) {
        $('#mod').val(mod).change();
    }
    return parseInt($('#mod').val());
}

function depth(depth) {
    if (depth) {
        $('#depth').val(depth).change();
    }
    return parseInt($('#depth').val());
}

function depthHasSlack() {
    return EANx_js.ndl(depth() + 1, eanx()) > abt() && mod() > depth();
}

function maximiseDepth() {
    while (depthHasSlack()) {
        depth(depth() + 1);
    }
}

function abt(abt) {
    if (abt) {
        $('#abt').val(abt).change();
        $('#abt').siblings('span.clock').html(minsToHM(abt));
    }
    return parseInt($('#abt').val());
}

function abtHasSlack() {
    return ndl() > abt();
}

function maximiseAbt() {
    abt(ndl());
}

function tooDeep(state) {
    // TODO Only show suitable gas mix link if depth() < mod()
    $('section.depth .warning').hide();
    $('section.depth .slack').hide();
    if (state) {
        $('section.depth .warning').show();
    } else {
        if (depthHasSlack()) {
            $('section.depth .slack').show();
        }
    }
}

function tooLong(state) {
    $('section.abt .warning').hide();
    $('section.abt .slack').hide();
    if (state) {
        $('section.abt .warning').show();
    } else {
        if (abtHasSlack()) {
            $('section.abt .slack').show();
        }
    }
}

function minsToHM(mins) {
    return Math.floor(mins / 60) + 'h ' + (mins % 60) + 'm';
}