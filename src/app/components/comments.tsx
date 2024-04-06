import prisma from '@/lib/db';
import {format} from 'date-fns';
import React, {FC} from 'react';

interface CommentsProps {
    postId: string,
}

const Comments: FC<CommentsProps> = async ({postId}) => {
    const comments = await prisma.comment.findMany(
        {
            where: {
                postId: postId
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
            }
        }
    );

    return (
        <div className='mt-8'>
            <h2 className="text-2xl font-bold">Comments</h2>
            {comments.length === 0 && (
                <div>
                    <span className=" font-semibold text-base text-gray-700">No Comment yet!.</span>
                    <br />
                    <span className=' font-light text-sm text-gray-600 italic'>Be the first to comment.</span>
                </div>
            )}
            {comments.length > 0 && (
                <ul className="">
                    {comments.map(comment => (
                        <li className='mb-4 bg-slate-100 p-4 rounded-lg' key={comment.id}>
                            <div className="flex items-center mb-2">
                                <div className="text-blue-500 font-bold mr-2">
                                    {comment.author?.name}
                                </div>
                                <div className="text-gray-500">
                                    {format(comment.createdAt, 'dd MMM, yyyy')}
                                </div>
                            </div>
                            <p>{comment.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Comments;