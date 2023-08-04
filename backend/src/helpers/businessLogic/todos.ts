import { TodosAccess } from '../dataLayer/todosAccess';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest';
import { createLogger } from '../../utils/logger';
import * as uuid from 'uuid';

// TODO: Implement businessLogic
const logger = createLogger("Todos");
const todosAccess = new TodosAccess();

/**
 * Create new TODO item.
 * @param request : CreateTodoRequest
 * @param userId : String
 * @returns 
 */
export const createTodo = async (request: CreateTodoRequest, userId: string) => {
    logger.info("Todos: createTodo");

    if (request) {
        logger.info("Todos: Add new todo item");
        const todoId = uuid.v4()
        return await todosAccess.createTodo({
            userId: userId,
            todoId: todoId,
            createdAt: (new Date()).toISOString(),
            done: false,
            attachmentUrl: null,
            ...request
        });
    } else {
        logger.error("Todos: Failed to add new todo item.");
    }
}

/**
 * create attachment presigned Url
 * @param userId : string
 * @param todoId : string
 * @returns 
 */
export const createAttachmentPresignedUrl = async (userId: string, todoId: string) => {
    logger.info("Todos: createAttachmentPresignedUrl");
    const attachmentId = uuid.v4();

    return await todosAccess.createAttachmentPresignedUrl(userId, todoId, attachmentId);
}

/**
 * get all TODO item for loggedin user.
 * @param userId : string
 * @returns 
 */
export const getTodos = async (userId: string) => {
    logger.info("Todos: getTodos");
    return await todosAccess.getTodos(userId);
}

/**
 * update an existed TODO item.
 * @param userId :string
 * @param todoId : string
 * @param request : UpdateTodoRequest
 */
export const updateTodo = async (userId: string, todoId: string, request: UpdateTodoRequest) => {
    logger.info("Todos: updateTodo");
    await todosAccess.updateTodo(userId, todoId, request);
}

/**
 * delete an existed TODO item
 * @param userId : string
 * @param todoId : string
 */
export const deleteTodo = async (userId: string, todoId: string) => {
    logger.info("Todos: deleteTodo");
    await todosAccess.deleteTodo(userId, todoId);
}