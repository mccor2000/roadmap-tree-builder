import RoadmapModel, { Roadmap } from "../models/roadmap";

export const getRoadmaps = async (
  _user: any,
  filter: any
): Promise<{ statusCode: number; message?: string; data?: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const roadmaps = await RoadmapModel.find(filter).lean().exec();

      return resolve({
        statusCode: 200,
        data: roadmaps,
      });
    } catch (err) {
      return reject(err);
    }
  });
};

export const createRoadmap = async (
  user: any,
  roadmapData: any
): Promise<{ statusCode: number; message?: string; data?: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingRoadmap = await RoadmapModel.findOne({
        name: roadmapData.name,
        owner: user.id,
      })
        .lean()
        .exec();

      if (existingRoadmap)
        return resolve({
          statusCode: 400,
          message: `Roadmap ${roadmapData.name} already exists in your account`,
        });

      const newRoadmap = await RoadmapModel.create({
        ...roadmapData,
        owner: user.id,
      });

      return resolve({
        statusCode: 201,
        message: `Roadmap ${roadmapData.name} has been created`,
        data: newRoadmap,
      });
    } catch (err) {
      return reject(err);
    }
  });
};

export const getRoadmapById = async (
  user: any,
  roadmapId: string
): Promise<{ statusCode: number; message?: string; data?: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingRoadmap = <Roadmap>await RoadmapModel.findOne({
        _id: roadmapId,
      }).lean();

      if (!existingRoadmap)
        return resolve({
          statusCode: 404,
          message: `Roadmap not found`,
        });

      if (existingRoadmap.isPrivate && existingRoadmap.owner != user.id)
        return resolve({
          statusCode: 403,
          message: `You do not have access to this roadmap`,
        });

      return resolve({
        statusCode: 200,
        data: existingRoadmap,
      });
    } catch (err) {
      return reject(err);
    }
  });
};

export const updateRoadmapById = async (
  user: any,
  roadmapId: string,
  updatePayload: any
): Promise<{ statusCode: number; message?: string; data?: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingRoadmap = <Roadmap>await RoadmapModel.findOne({
        _id: roadmapId,
      });

      if (!existingRoadmap)
        return resolve({
          statusCode: 404,
          message: `Roadmap not found`,
        });

      if (existingRoadmap.isPrivate && existingRoadmap.owner !== user.id)
        return resolve({
          statusCode: 403,
          message: `You do not have access to this roadmap`,
        });

      await existingRoadmap.update(updatePayload);
      await existingRoadmap.save();

      return resolve({
        statusCode: 200,
        message: `Roadmap ${existingRoadmap.name} has been updated`,
        data: existingRoadmap,
      });
    } catch (err) {
      return reject(err);
    }
  });
};

export const deleteRoadmapById = async (
  user: any,
  roadmapId: string
): Promise<{ statusCode: number; message?: string; data?: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingRoadmap = <Roadmap>await RoadmapModel.findOne({
        _id: roadmapId,
      });

      if (!existingRoadmap)
        return resolve({
          statusCode: 404,
          message: `Roadmap not found`,
        });

      if (existingRoadmap.isPrivate && existingRoadmap.owner !== user.id)
        return resolve({
          statusCode: 403,
          message: `You do not have access to this roadmap`,
        });

      await RoadmapModel.findByIdAndRemove(roadmapId).lean();

      return resolve({
        statusCode: 200,
        message: `Roadmap ${existingRoadmap.name} has been deleted`,
      });
    } catch (err) {
      return reject(err);
    }
  });
};
