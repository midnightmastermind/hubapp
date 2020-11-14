const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require("./event.model.js");
//create schema
const BlockSchema = new Schema({
    title: { type: String },
    children: [{type: Schema.Types.ObjectId, ref: 'Block'}],
    deletable: { type: Boolean },
    userId: {type: String, ref: 'User'},
    isDirectory: { type: Boolean },
    type: { type: String, enum: ['HomeBlock','FolderBlock','TaskBlock']},
    expanded: { type: Boolean, default: false},
    reoccuring: { type: Boolean, default: false },
    scheduled: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    completedDates: [{type: Date }],
    completed: {type: Boolean, default: false}
})

BlockSchema.pre('findOneAndUpdate', function(next) {
  let newChildren = [];
  this._update.children.map(child => {
        newChildren.push(recursive_reference(child, "children"));
  });
  this._update.children = newChildren;

  if (this._update.scheduled) {
     this._update.scheduled = this._update.scheduled.map(eventObj => {
          if (eventObj._id) {
              return eventObj;
          } else {
              let newEvent = new Event(eventObj);
              newEvent.save();
              return newEvent;
          }
      });
  }
  next();
});

// BlockSchema.post('findOneAndUpdate', function(doc, next) {
//   recursive_reference(this._update, "children")
//   console.log(this._update["children"]);
//   next();
// });
//create model
const Block = mongoose.model('Block', BlockSchema);

function recursive_reference(obj, field) {
  if (obj[field] && obj[field].length) {
    let newObjs = [];

    obj[field].forEach(function(d) {
      newObjs.push( recursive_reference(d, field) );
    });

    obj[field] = newObjs;
  }
  if (obj['scheduled']) {
      obj['scheduled'].map(eventObj => {
          if (eventObj._id) {
              return eventObj;
          } else {
              let newEvent = new Event(eventObj);
              newEvent.save();
              return newEvent;
          }
      });
  }
  if (obj._id) {
      return obj;
  }
  let newBlock = new Block(obj);
  newBlock.save();
  return newBlock;
}

module.exports = Block;
