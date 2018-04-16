module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var size = new Schema({
        from: Number,
        to: Number,
        title: String
    });
    return mongoose.model('size', size);
};
