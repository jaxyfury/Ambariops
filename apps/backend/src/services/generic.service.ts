
import type { Model, Document } from 'mongoose';
import mongoose from 'mongoose';

const toResponse = <T>(doc: Document): T => {
    const obj = doc.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
};

export const findAll = async <T extends Document>(model: Model<T>): Promise<any[]> => {
    const items = await model.find({});
    return items.map(toResponse);
};

export const findById = async <T extends Document>(model: Model<T>, id: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const item = await model.findById(id);
    return item ? toResponse(item) : null;
};

export const create = async <T extends Document>(model: Model<T>, data: any): Promise<any> => {
    const newItem = new model(data);
    await newItem.save();
    return toResponse(newItem);
};

export const update = async <T extends Document>(model: Model<T>, id: string, data: any): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const updatedItem = await model.findByIdAndUpdate(id, data, { new: true });
    return updatedItem ? toResponse(updatedItem) : null;
};

export const deleteById = async <T extends Document>(model: Model<T>, id: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return model.findByIdAndDelete(id);
};
