
import type { Model, Document } from 'mongoose';
import mongoose from 'mongoose';

export const findAll = async <T extends Document>(model: Model<T>): Promise<any[]> => {
    return model.find({}).lean();
};

export const findById = async <T extends Document>(model: Model<T>, id: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return model.findById(id).lean();
};

export const create = async <T extends Document>(model: Model<T>, data: any): Promise<any> => {
    const newItem = new model(data);
    await newItem.save();
    return newItem.toJSON();
};

export const update = async <T extends Document>(model: Model<T>, id: string, data: any): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return model.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const deleteById = async <T extends Document>(model: Model<T>, id: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return model.findByIdAndDelete(id).lean();
};
