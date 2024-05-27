// public
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';
import Task from '@/models/task';

//* update subtask
export const PUT = async (req: any) => {
    // variables
    const { _id, reqData } = await req.json();

    if (req.method !== 'PUT')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    // check if subtask don't exists
    const subtask = await Task.findOne({ 'subtasks._id': _id });
    if (!subtask) {
        return NextResponse.json({
            message: "Subtask don't exists!",
            status: 400,
        });
    }

    // update list
    try {
        await Task.updateOne({ 'subtasks._id': _id }, { ...reqData });
        return NextResponse.json({
            message: 'The subtask was updated successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};

//* delete subtask
export const DELETE = async (req: any) => {
    // variables
    const { _id } = await req.json();

    // database connection
    try {
        await connectDB();
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });
    }

    if (req.method !== 'DELETE')
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 401,
        });

    // id validation
    if (!_id) {
        return NextResponse.json({
            message: 'ID not found',
            status: 401,
        });
    }

    // check if subtask don't exists
    const subtask = await Task.findOne({ subtasks: { _id } });
    if (!subtask) {
        return NextResponse.json({
            message: "Subtask don't exists!",
            status: 400,
        });
    }

    // delete task
    try {
        await Task.deleteOne({ subtasks: { _id } });
        return NextResponse.json({
            message: 'The subtask was deleted successfully.',
            status: 200,
        });
    } catch {
        return NextResponse.json({
            message: 'Something went wrong. Please try again later.',
            status: 500,
        });
    }
};
