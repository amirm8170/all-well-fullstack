import * as mongoose from 'mongoose';

//create mongoose schema to don't store invalid data in db.
//index is true here because if someone need to search in db with email, it uses index and it can be faster than normal search without index.like searchById, id has index as default so this search is faster than other. and now email search is fast like id.;)
export const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, min: 6, max: 150 },
  },
  { timestamps: true },
);
