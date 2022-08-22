import 'reflect-metadata';
import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

import status from 'server/http-status';
import BaseContext from '../BaseContext';

export default class BaseController extends BaseContext {
  constructor(opts: any) {
    super(opts);
    this.getServerSideProps = this.getServerSideProps.bind(this);
  }

  protected getServerSideProps(req, res) {}

  public run = (req, res) =>
    createRouter()
      .get(async (req, res) => {
        try {
          const data = await this.getServerSideProps(req, res);
          return { props: { data } };
        } catch (error: any) {
          console.error('🔴 getServerSideProps', error);
          return {
            props: { message: status['400_MESSAGE'] },
          };
        }
      })
      .run(req, res);

  public handler(routeName: string) {
    const router = createRouter<NextApiRequest, NextApiResponse>();

    // get middleware functions that was defined under class name
    const classMiddleware = Reflect.getMetadata(
      this.constructor.name,
      this.constructor
    );
    const classArgs = Array.isArray(classMiddleware) ? classMiddleware : [];
    for (let i = 0; i < classArgs.length; i++) {
      router.use(classArgs[i]);
    }
    const members: any = Reflect.getMetadata(routeName, this);
    Object.keys(members).map((method) => {
      for (let i = 0; i < members[method].length; i++) {
        const callback = this[members[method][i]].bind(this);
        const methodName: string = method.toLowerCase();
        if (typeof router[methodName] === 'function') {
          // get middleware functions that was defined under action(method of class)
          const key = this.constructor.name + '_' + members[method][i];
          const methodMiddleware = Reflect.getMetadata(key, this.constructor);
          const methodArgs = Array.isArray(methodMiddleware)
            ? methodMiddleware
            : [];
          // for (let j = 0; j < methodArgs.length; j++) {
          //   router.use(routeName, methodArgs[j]);
          // }

          // the last middleware is action of controller
          const action = async (req, res, next) => {
            try {
              const data = await callback({
                body: req?.body,
                params: req?.params,
                session: req?.session,
                identity: req?.user,
              } as any);
              if (methodName !== 'use') {
                return res.json({ data });
              } else {
                return await next();
              }
            } catch (error: any) {
              console.error('🔴 Handler', error);
              return res.status(400).json({ message: error.message });
            }
          };
          const args = [...methodArgs, action];
          router[methodName](routeName, ...args);
          if (methodName === 'use') {
            classArgs.length = 0;
          }
        }
      }
    });
    return router.handler();
  }
}
