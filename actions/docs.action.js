"use server";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/lib/auth";
import {
  getPipelineLength,
  getPipelineNodeByOrderNo,
} from "@/actions/pipeline.action";
import { getUser } from "@/actions/user.action";

export const addDocument = async (title, location, pipelineId, uploaderId) => {
  if (title.length === 0 || location.length === 0 || pipelineId.length === 0)
    return { error: "title or location or pipeline cannot be empty" };
  try {
    const pipelineData = await getPipelineLength(pipelineId);
    const pipelineLength = pipelineData.data;

    await prisma.document.create({
      data: {
        title: title,
        location: location,
        status: "IN PROGRESS",
        stage: 0,
        totalStages: pipelineLength,
        uploader: {
          connect: {
            id: uploaderId,
          },
        },
        pipeline: {
          connect: {
            id: pipelineId,
          },
        },
      },
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const getDocumentsCreatedByUser = async (userId) => {
  try {
    const res = await prisma.document.findMany({
      where: {
        uploaderId: userId,
      },
    });

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const getDocumentsFromPipeline = async (pipelineId) => {
  try {
    const res = await prisma.document.findMany({
      where: {
        pipeline: {
          is: {
            id: pipelineId,
          },
        },
      },
    });

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const updateDocumentStage = async (pipelineId, docId) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw Error("Unauthorised to perform action");
    }

    const userData = await getUser(user.id);
    const userEmail = userData.data.email;

    const doc = await prisma.document.findUnique({
      where: {
        id: docId,
      },
    });

    if (doc.status === "REJECTED") {
      throw Error("Document cannot be updated as it is rejected.");
    }

    const pipelineNode = await getPipelineNodeByOrderNo(pipelineId, userEmail);

    let res = {};
    if (doc.stage === pipelineNode.data.orderNo) {
      let newStage = doc.stage + 1;
      let newData = { stage: newStage };
      if (newStage === doc.totalStages) {
        newData.status = "COMPLETED";
      }
      res = await prisma.document.update({
        where: {
          id: docId,
        },
        data: newData,
      });
    } else {
      throw Error("Action not allowed.");
    }

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export const updateDocumentStatus = async (pipelineId, docId) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw Error("Unauthorised to perform action");
    }

    const userData = await getUser(user.id);
    const userEmail = userData.data.email;

    const doc = await prisma.document.findUnique({
      where: {
        id: docId,
      },
    });

    if (doc.status === "REJECTED") {
      throw Error("Document cannot be updated as it is rejected.");
    }

    const pipelineNode = await getPipelineNodeByOrderNo(pipelineId, userEmail);

    let res = {};
    if (doc.stage === pipelineNode.data.orderNo) {
      res = await prisma.document.update({
        where: {
          id: docId,
        },
        data: {
          status: "REJECTED",
        },
      });
    } else {
      throw Error("Action not allowed.");
    }

    return { success: true, data: res };
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};
