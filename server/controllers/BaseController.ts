import 'reflect-metadata';
import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

import status from 'server/http-status';
import BaseContext from '../BaseContext';
import httpStatus from 'server/http-status';
import { IRequestResult } from 'server/constants';

export default class BaseController extends BaseContext {
  private _data: any | null;
  private _message: any | null;
  private _status: number | null;

  protected json(data: any, className: any | null = null) {
    this._data = className ? this.di.toJS(data, className) : data;
    return this;
  }

  protected status(code: number) {
    this._status = code;
    return this;
  }

  protected message(message: any) {
    this._message = message;
    return this;
  }

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

  // get middleware functions that was defined under class name
  private useClassMiddleware(router) {
    const classMiddleware = Reflect.getMetadata(
      this.constructor.name,
      this.constructor
    );
    const classArgs = Array.isArray(classMiddleware) ? classMiddleware : [];
    for (let i = 0; i < classArgs.length; i++) {
      router.use(classArgs[i]);
    }
    return classArgs;
  }

  // get middleware functions that was defined under action(method of class)
  private useMethodMiddleware(methodName: string) {
    const key = this.constructor.name + '_' + methodName;
    const methodMiddleware = Reflect.getMetadata(key, this.constructor);
    const methodArgs = Array.isArray(methodMiddleware) ? methodMiddleware : [];
    return methodArgs;
  }

  public handler(routeName: string) {
    const router = createRouter<NextApiRequest, NextApiResponse>();
    const classArgs = this.useClassMiddleware(router);
    const members: any = Reflect.getMetadata(routeName, this);
    Object.keys(members).map((method) => {
      for (let i = 0; i < members[method].length; i++) {
        const methodName: string = method.toLowerCase();
        if (typeof router[methodName] === 'function') {
          const methodArgs = this.useMethodMiddleware(members[method][i]);
          // the last middleware is action of controller
          const callback = this[members[method][i]].bind(this);
          const action = async (req, res, next) => {
            try {
              await callback({
                body: req?.body,
                params: req?.params,
                session: req?.session,
                identity: req?.user,
              } as any);
              if (methodName !== 'use') {
                const status = this._status || httpStatus.OK;
                let result: IRequestResult = { data: this._data };
                this._data = null;
                if (this._message) {
                  result['message'] = this._message;
                  this._message = null;
                }
                return res.status(status).json(result);
              } else {
                return await next();
              }
            } catch (e: any) {
              console.error('🔴 Handler', e);
              const message = e?.message ? e.message : e;
              return res.status(400).json({ message });
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
