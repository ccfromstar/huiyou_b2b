function Common(c) {
    this.id = c.id;
    this.op = c.op;
};
module.exports = Common;

Common.prototype.getFP = function get(callback) {
    var c = {
        id: this.id,
        op: this.op
    };
    var p = "";
    var op = c.op;
    switch(c.id)
    {
    case "q1111":
        p = op.q1111.path;break;
    case "q1211":
        p = op.q1211.path;break;
    case "q1311":
        p = op.q1311.path;break;
    case "q1411":
        p = op.q1411.path;break;

    case "q2111":
        p = op.q2111.path;break;
    case "q2211":
        p = op.q2211.path;break;
    case "q2311":
        p = op.q2311.path;break;
    case "q2411":
        p = op.q2411.path;break;

    case "q3111":
        p = op.q3111.path;break;
    case "q3211":
        p = op.q3211.path;break;
    case "q3311":
        p = op.q3311.path;break;
    case "q3411":
        p = op.q3411.path;break;

    case "q4111":
        p = op.q4111.path;break;
    case "q4211":
        p = op.q4211.path;break;
    case "q4311":
        p = op.q4311.path;break;
    case "q4411":
        p = op.q4411.path;break;


    case "q5111":
        p = op.q5111.path;break;
    case "q5211":
        p = op.q5211.path;break;
    case "q5311":
        p = op.q5311.path;break;
    case "q5411":
        p = op.q5411.path;break;


    case "q6111":
        p = op.q6111.path;break;
    case "q6211":
        p = op.q6211.path;break;
    case "q6311":
        p = op.q6311.path;break;
    case "q6411":
        p = op.q6411.path;break;


    case "q7111":
        p = op.q7111.path;break;
    case "q7211":
        p = op.q7211.path;break;
    case "q7311":
        p = op.q7311.path;break;
    case "q7411":
        p = op.q7411.path;break;


    case "q8111":
        p = op.q8111.path;break;
    case "q8211":
        p = op.q8211.path;break;
    case "q8311":
        p = op.q8311.path;break;
    case "q8411":
        p = op.q8411.path;break;
    }
    p = p.replace("public\\files\\","").replace("public/files/","");
    return p;
}









