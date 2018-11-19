import {
  getSmsCode,
  getAuth,
  getToucherList,
  addToucher,
  getToucherDetail,
  uploadLogoRequest,
  updateDetailRequest,
  getTotalServices,
  deleteToucher,
} from '../services/request';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'loginModel',
  state: {
    list: [1, 2],
    type: 'LOGIN',
    user: 'userTest',
    token: '18253163738_923fdbc2d5238e82cafd06eb5943d8f3',
    toucherDetail: {
      OwnedServices: [],
      Toucher: {
        description:
          '海尔秉承锐意进取的海尔文化，不拘泥于现有的家电行业的产品与服务形式，在工作中不',
        id: '61d93aeae71211e8b0b3fa163e35cfb8',
        logo: 'http://userapp.bj.bcebos.com/file/20181114/00001074_20181114_163120_425195925_1',
        shareQrcode:
          'https://useapp.rrs.com/api/v1/barcode/common/qrcode?content=https://appt.rrs.com/index.html?id=61d93aeae71211e8b0b3fa163e35cfb8',
        title: '海尔23',
      },
    },

    ownedServices: [
      {
        id: 'f0af8bcee32811e89f32f2801f1b9fd1',
        title: '乐家',
        logo: '',
      },
    ],

    providedServices: [
      {
        id: 'f0af8bcee32811e89f32f2801f1b9fd2',
        title: '日日顺',
        logo: '',
      },
    ],

    totalServices: [
      {
        id: 'f0af8bcee32811e89f32f2801f1b9fd1',
        title: '乐家',
        logo: '',
      },
      {
        id: 'f0af8bcee32811e89f32f2801f1b9fd2',
        title: '日日顺',
        logo: '',
      },
    ],
  },
  effects: {
    *getSmsCode(data, sagaEffects) {
      const mobile = data.payload.mobile;
      const token = data.payload.token;
      // const { call, put } = sagaEffects;

      const result = getSmsCode(mobile, token);
      // yield put({ type: 'getSmsCode', payload: result });
    },

    *auth(data, sagaEffects) {
      const mobile = data.payload.mobile;
      const smsCode = data.payload.smsCode;
      const token = data.payload.token;
      const { call, put } = sagaEffects;

      const result = yield call(getAuth, mobile, smsCode, token);

      if (result.code === 1000) {
        yield put({ type: 'getAuthToken', payload: result.data.token });
        router.push('/toucherList');
      } else {
        Toast.fail('登录失败，请稍后重试');
      }
    },

    *getToucherList(data, sagaEffects) {
      const token = data.payload.token;
      const { call, put } = sagaEffects;
      const result = yield call(getToucherList, token);

      yield put({
        type: 'getToucherListReducer',
        payload: {
          toucherList: result.data,
        },
      });
    },

    *putAddToucher(data, sagaEffects) {
      const title = data.payload.title;
      const option = {
        method: 'PUT',
      };
      const token = data.payload.token;
      const { call, put } = sagaEffects;
      const result = yield call(addToucher, token, title, option);
      if (result.code === 1000) {
        const toucherListResult = yield call(getToucherList, token);
        yield put({
          type: 'getToucherListReducer',
          payload: {
            toucherList: toucherListResult.data,
          },
        });
      }
    },

    *getToucherDetail(data, sagaEffects) {
      const token = data.payload.token;
      const toucherId = data.payload.toucherId;
      const option = {
        method: 'GET',
      };
      const { call, put } = sagaEffects;
      const result = yield call(getToucherDetail, token, toucherId, option);
      const services = yield call(getTotalServices, token, option);
      if (result.code === 1000) {
        yield put({
          type: 'getToucherDetailReducer',
          payload: {
            toucherDetail: result.data,
            totalServices: services.data,
          },
        });
        router.push('/toucherManage');
      }
    },

    *uploadLogo(data, sagaEffects) {
      const token = data.payload.token;
      const option = data.payload.option;
      const id = data.payload.id;
      const toucher = data.payload.toucher;
      const { call, put } = sagaEffects;
      const result = yield call(uploadLogoRequest, token, option);

      toucher.Toucher.logo = result.data;

      const send_option = {
        logo: result.data,
      };
      const updateDetailResult = yield call(updateDetailRequest, token, id, send_option);

      if (updateDetailResult.code === 1000) {
        yield put({
          type: 'uploadLogoReducer',
          payload: {
            toucherDetail: toucher,
          },
        });
        Toast.hide();
      }
    },

    *changeTitle(data, sagaEffects) {
      const token = data.payload.token;
      const id = data.payload.id;
      const title = data.payload.title;
      const toucher = data.payload.toucher;

      const { call, put } = sagaEffects;

      toucher.Toucher.title = title;

      const option = {
        title: title,
      };

      const updateDetailResult = yield call(updateDetailRequest, token, id, option);

      if (updateDetailResult.code === 1000) {
        yield put({
          type: 'updateDetailReducer',
          payload: {
            toucherDetail: toucher,
          },
        });
        Toast.hide();
      }
    },

    *changeDescription(data, sagaEffects) {
      const token = data.payload.token;
      const id = data.payload.id;
      const description = data.payload.description;
      const toucher = data.payload.toucher;

      const { call, put } = sagaEffects;

      toucher.Toucher.description = description;

      const option = {
        description: description,
      };

      const updateDetailResult = yield call(updateDetailRequest, token, id, option);

      if (updateDetailResult.code === 1000) {
        yield put({
          type: 'updateDetailReducer',
          payload: {
            toucherDetail: toucher,
          },
        });
        Toast.hide();
      }
    },

    *addService(data, sagaEffects) {
      const token = data.payload.token;
      const id = data.payload.id;
      const serviceId = data.payload.serviceId;
      const ownedServices = data.payload.ownedServices;
      let sendServices = [];
      for (let i = 0; i < ownedServices.length; i++) {
        sendServices.push(ownedServices[i].id);
      }
      sendServices.push(serviceId);

      const option = {
        services: sendServices,
      };
      const { call, put } = sagaEffects;

      const updateDetailResult = yield call(updateDetailRequest, token, id, option);

      if (updateDetailResult.code === 1000) {
        yield put({
          type: 'addServiceReducer',
          payload: {
            serviceId: serviceId,
          },
        });
      }
    },

    *deleteService(data, sagaEffects) {
      const token = data.payload.token;
      const id = data.payload.id;
      const serviceId = data.payload.serviceId;
      const ownedServices = data.payload.ownedServices;
      let sendServices = [];
      sendServices = ownedServices.filter(s => s.id !== serviceId);

      const option = {
        services: sendServices,
      };
      const { call, put } = sagaEffects;

      const updateDetailResult = yield call(updateDetailRequest, token, id, option);

      if (updateDetailResult.code === 1000) {
        yield put({
          type: 'deleteServiceReducer',
          payload: {
            serviceId: serviceId,
            ownedServices: sendServices,
          },
        });
      }
    },

    *deleteToucher(data, sagaEffects) {
      const token = data.payload.token;
      const id = data.payload.id;
      const { call, put } = sagaEffects;

      const option = {
        method: 'DELETE',
      };

      const result = yield call(deleteToucher, token, id, option);

      if (result.code === 1000) {
        router.push('/toucherList');
      }
    },
  },

  /**
   * Reducer
   *
   *
   */
  reducers: {
    getAuthToken(state, { payload: authToken }) {
      // console.log('=====authToken=====', authToken);
      return {
        ...state,
        token: authToken,
      };
    },

    getToucherListReducer(
      state,
      {
        payload: { toucherList },
      }
    ) {
      return {
        ...state,
        toucherList: toucherList.reverse(),
      };
    },

    getToucherDetailReducer(
      state,
      {
        payload: { toucherDetail, totalServices },
      }
    ) {
      const providedService = totalServices.filter(
        s1 => !toucherDetail.OwnedServices.some(s2 => s2.id === s1.id)
      );
      return {
        ...state,
        toucherDetail: toucherDetail,
        ownedServices: toucherDetail.OwnedServices,
        totalServices: totalServices,
        providedServices: providedService,
      };
    },

    uploadLogoReducer(
      state,
      {
        payload: { toucherDetail },
      }
    ) {
      return {
        ...state,
        toucherDetail: toucherDetail,
      };
    },

    updateDetailReducer(
      state,
      {
        payload: { toucherDetail },
      }
    ) {
      return {
        ...state,
        toucherDetail: toucherDetail,
      };
    },

    addServiceReducer(
      state,
      {
        payload: { serviceId },
      }
    ) {
      const providedService = state.providedServices.filter(s => s.id !== serviceId);
      const changedService = state.providedServices.filter(s => s.id === serviceId);
      const ownedServices = state.ownedServices.concat(changedService);

      return {
        ...state,
        providedServices: providedService,
        ownedServices: ownedServices,
      };
    },

    deleteServiceReducer(
      state,
      {
        payload: { serviceId, ownedServices },
      }
    ) {
      const changedService = state.ownedServices.filter(s => s.id === serviceId);
      const providedService = state.providedServices.concat(changedService);

      return {
        ...state,
        providedServices: providedService,
        ownedServices: ownedServices,
      };
    },
  },
};
