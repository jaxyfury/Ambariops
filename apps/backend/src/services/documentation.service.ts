
import { Documentation } from '../models/documentation.model';
import type { DocumentationArticle } from '@amberops/lib';

const toResponse = (doc: any): DocumentationArticle => {
    const obj = doc.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
};

export const findAllArticles = async () => {
    const articles = await Documentation.find({});
    return articles.map(toResponse);
};

export const createArticle = async (articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArticle = new Documentation(articleData);
    await newArticle.save();
    return toResponse(newArticle);
};

export const updateArticle = async (slug: string, articleData: Partial<DocumentationArticle>) => {
    const updatedArticle = await Documentation.findOneAndUpdate({ slug }, articleData, { new: true });
    return updatedArticle ? toResponse(updatedArticle) : null;
};

export const deleteArticle = async (slug: string) => {
    return Documentation.findOneAndDelete({ slug });
};
