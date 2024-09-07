import {Handler, Context} from 'aws-lambda';
import {AppController} from "./src/controller/appController";

const appController = new AppController();

export const getAll: Handler = async (event, context: Context) => {
  return appController.getAll(event, context);
}

export const getById: Handler = async (event, context: Context) => {
  return appController.getById(event, context);
}

export const save: Handler = async (event, context: Context) => {
  return appController.save(event, context);
}

export const createFromApi: Handler = async (event, context: Context) => {
  return appController.saveFromApi(event, context);
}

export const index: Handler = async (event, context: Context) => {
  return appController.index(event, context);
}