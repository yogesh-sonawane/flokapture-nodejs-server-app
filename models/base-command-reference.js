var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const dbConnection = global.dbConnection;

var baseCommandRefSchema = new Schema({
    LanguageId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    ClassStart: {
        required: false,
        type: String,
        default: ""
    },
    ClassEnd: {
        required: false,
        type: String,
        default: ""
    },
    IfStart: {
        type: [String],
        required: true
    },
    ElseBlock: {
        type: String,
        required: true,
        default: "ELSE"
    },
    IfEnd: {
        required: true,
        type: [String]
    },
    CallInternal: {
        required: true,
        type: [String]
    },
    CallExternal: {
        required: true,
        type: [String]
    },
    Loop: {
        Start: {
            required: true,
            type: [String]
        },
        End: {
            required: true,
            type: [String]
        }
    },
    MethodOrParagraph: {
        Start: {
            required: true,
            type: [String]
        },
        End: {
            required: true,
            type: String
        }
    },
    BlockComment: {
        Start: {
            type: String,
            required: true,
            trim: true,
            default: "/*"
        },
        End: {
            type: String,
            required: true,
            trim: true,
            default: "*/"
        }
    },
    LineComment: {
        type: String,
        required: true,
        trim: true,
        default: "*"
    },
    CommentWithinLine: {
        type: String,
        required: true,
        trim: true,
        default: "; *"
    },
    LanguageMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LanguageMaster',
        autopopulate: true
    }
});

baseCommandRefSchema.pre("save", function(next){
    this.LanguageMaster = this.LanguageId;
    next();
});

baseCommandRefSchema.pre("aggregate", function (next) {
    this.lookup(languageVirtulas.value).unwind(languageVirtulas.path);
    next();
});

const mongooseAutopopulate = require('mongoose-autopopulate');
baseCommandRefSchema.plugin(mongooseAutopopulate);

const BaseCommandReferenceMaster = dbConnection.model("BaseCommandReferenceMaster", baseCommandRefSchema, "BaseCommandReferenceMaster");

module.exports = BaseCommandReferenceMaster;