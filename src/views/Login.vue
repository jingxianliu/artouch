<template>
    <div class="content">
        <el-container>   
          <el-main>
              <div>
                <img  width="44" height="44"  src ="data:image/png;base64,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"/>
                <img  width="93" height="93"   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQUAAAEFCAYAAADqlvKRAAAACXBIWXMAABcRAAAXEQHKJvM/AAAWfUlEQVR4nO2dP3IcOZaHUwoa42yQa41J3kDsE4jyxhP6AqPSCZpjrLcRXfInQqUTiDxBp/yN6NIJhjzBVJljDSvWWY8bYD9IeCgkEshEZpHU90UwQmIls5D488uHh4eHF/f39w0AgOMlNQEAPogCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACgQBQBQIAoAoEAUAECBKACAAlEAAAWiAAAKRAEAFIgCACiOSqvDGLPMuGzTtu0VVf28MMasmqY5TzzUZdu2Nz96PT11ikRBBOHXjEvfP+V6Mcasm6Z5Lf/dNU1zIz9t27brib7z3vvvrRXWpmnsd121bXs3xXeWYIw5aZrml54/OXg558QYc9Y0zdlMX3kzdT+QNm5e3N/f91/9xx+cSyc97rl027btXBU1CYEohHxt2/ai9vcGouBjRWlh1WjuevAxxpimaX5LXLK15Rz7PV2ia4ypVudjhV3Ggm2P01plyuSL9IWq4iBicCk/JstSMMbYxl5lCIIlZ3rxlHltjLFm8mqmZ7B1bqdiJweuM9PzuR0gv1f4nhfqS/+wTi8z+14WxhgrtMshbSgD6BCCYHkr43C0+DbfLZ2ltO23+j0KLjqRLzzz5o7nhQ2yEBE5BBv5aSee2xppnLk4tm/KqaYuBc887xcac5k5XS3F9uePxpjNAAvs/ECC4Hg3VhTE6rvssoaPgguvKihyl9k9B+67fzXGXLdteyhxelaIyFd7UyfYBR9dTvx9l/LWf/aIVbCQn6SoPYiCzJFS88WnyDvrG2AVpApzWQmh9TX1G3mKF9iol5FY69YifFWjMCLoRqYeWThLYWpFPhQLsX5gIPKGSXWoXSXRsKb8pvBv/iarQl0sxNyei9ux1ql1Isq0abB/Rqx+E/oKcnGikLNacPvITC1TS00hSd8LY3UgX8enDEfhWt682W/JsVRaJUnFgkQJVhCGTvV2ti1z4xSsIFw8hvVyhwTSVDOzIFrHJxlOrW+WmKwUxAaFXWOvbY3m9sWbGUXhVaUVmCHUGAsPbZQrChdi1pieN8cyfGvInCbVsfai4BKd6wEbJyDlsdf8O/MZoJyLHvN8HZj8vU4sqI+MyzGC8NUfh1mi4FkI6x6H5EKu8Tnrceio9XeZw6aWoa79cv1RHzAFslyXNWUUge4SBEKfp6V4uiF8lemfauOiDVEiDteJS97JoB5Dn7k6Z3wA5JNqt0PGV8A+dgy/EYt7T/SLN0TJoEx5dBcjoxpTneuWDTfzUbDXpY/fci26tm1fZFz2WKkSAi9WV23fxK34f3r30hRvnZZBeZu4ZMwabd+cFCsBHjNnblPRSGqFtNv9KJ+apvmpbdtzu1qTs1gwxFJoZHB+7vjs1A7ugUFDKUHZEYgEj5xTWQYds9JyMjK2Zit+oKuhVvUgUbCDU5YEu9ZDi4OGxBeRckgiCPAUOMSy5EYCudY1ptfZolA4v3yd2Aoc8nvmfPMXY4y/n/9D27aH2pFZ8nwxhsw9c+upl4J5e8pB+CcR/z8Xfv2/ROD/b2DxD01p1GVt9qbutS3oodMH+AGQmJM9YfDyCaQE4X+bpvmPyO/t3/zlsQXD5WLjMowxnzISzkzBrta26RSIAmTjhdLmWIx/lVD02EqVNbFvrPX5FP1ENjrTGHMjz9fnFFxLrE7Xit22YGp8NWB/SDbOSYooQBLpKBeFG2zsTsFWMlh1/Y11yn2Waenapbw7cM6IbETMsgazLDF2icLmgNPgB8SfdylWSF7mpeaPSlj68QfGmKuU+rmUbBm+CBtEsZblyK4VjW/X5ZZ3YnYjo/SG/O3t3DkQB8Yp3LpQeIk4XfREwZ5KP3J9KdffkRvFNzTaL4o8T2mAXur6s8xkyN+oJSIyDbwMx/EgS0GUJRXAVFxoWdFYJuIUYiHUh+JmijyNPVw+gbfo3sY5sRje9wj+EN7Kiyn1tl5MsBlqUTkPw+kA4R0lCt5+pHTmpYqF2o3YYr1MdJ53Mgc9tPcX4tg4ehNzHorg31XK7OXzbmS+hDDT07MlmCIk26A4olHmmKm1sayoqRgyT9smLnnuSWGfKh/cztWu8kuM/VnP3pmQVORsDZ71ngw7Vq1VIL6df8qKSa8oD7EUUkkcdhVCkbEWng5fJeV4VnuIaCxkmugclylTfDlxmsAhffXqsYuJl3lpkBVVehjMSU8+hcFWgiPDt3D5jNPHPQXc9HA1NHpORGTlBqU4vE5Ch5z4I34WcaiZTOd2qI/msS6hythcDU3BJhRlXnJMbSU4rhLOl4VYCz/UaUQHYiPWwEZWTKqE0Yak7lmS02EuMpINTcVd4jCYsZmXdqWZlxypaKrRVoJ/r4QAHctn+BcmpmQt/kdBHHaHzHzehlnJKmVe+jYNdKKw6VtmkcpIdZCuz/pMtL35qLe+3bXGnOtTwPdQCTHxVwc+12MsW0kZOEboDn0kYqz+x2Re2kuhGKZ473RMiIoMiT+Ixs9n/N1Ys/Ervoc6eGcRzHEgzJS4KMq7Q5/NeWCuUz6hB1HwvMKXNSPApDNtejrT+5HK/Sbyu8lP6P3BWD4DQfBZTeSn+GJ9o2NvIuPmpnIS3Fv33H1jQ/kU5OKayy1tT2fajvXmPpVY+SdO1VDhR8BUGaerOGFl+rypUM6tl4Iteyo92YYoScLSN//EifV8eCyHBZ3PefhLQM2TwYfey7XD4EOWj7w14pr8JWO/+b8kddXkewiwJibnUR0W1LNZb0p+kUQ4Y+vhvHA1wWVeamsE9h0d0KP85xnTVj3lDMFPgd556swcShSaQyRfqR1QVbz3AeAH59DiN/kmLkQBoACZp5ds6qrJpOnYbCySXfkg8xLUYDGHb6iA2j4yhT1uXvbn5AYyWR/Bx47PrjMd7ndTHYQkgYlLmXK9ORqTLESclFcFTpH/aprmvwvWvK9l4woxB4+b0x/tYFlx6G1kQHW9vdeSVSx1q41c0xUYeJdx5P4gRMgvw9WaoZmXShJ4Omzevr8bY/6nIDrunYR2ryrvrTgIXi6Ks0Pn5YNqLBLjoGQlILV/oZooeH3wsuv7ikVB9iSktjbHsILwoKbWBBKFyhWGY6l0m0F31JbdQyBvEpf41Cny16dSfuglZWmXLIV37nK0b8WxYdlePsberdVZouCpS6kYNL4gODxhaAvud+zSbxljXKTW4ACNKREhMPIWiTU006FngIyLruX8bWHMwDqxnHkxJDAsxyqIkRQFL4PL0MQNf+uaD4kwuENFSuMkXLLLX40xO6lQP0347IMuQwh8ntvJ2Yc8rWuPiU5tjn5V4rPSQZyyKrLzN3hCYIZGdh55NzoXb6ozd8cENO1kf3ayYmTwXow88vxYHv5bBYhQuIFnRaL2bslzEYGmQAh8CO9+HqREoSiKVvY7fOkYyPbQ5vOUVexlXhqVyNY6PV9KUsd/i7J+lsE5RhDsfPm8ZA4kb5mfKibqPJZneD1RhNmxJML8pyw15QqCbfSfB4aiTrrMBmXIIOx6E+8G+gBSf9P3YltXyGz94B+pGby0k+nCxZBOb1XQnqFvt1I/s9TbtxKX/p92W+0Ih9GVTLceI4+tXHMIaCqIaKgl2Cb6vnHHusU+GJl56Yu8yB8skVrBS9XiCSRxa+slaH2K+/hvPUdorexPth7+UePk6YJTp3PJOZhlLk5mKkcygfGQG8oUYtUxlT6W6Urs2SbJvDSUa7lp1bRnIi5LqaChqx5zs/WyHP+IaeDGHszyZBBHZld/fAiBDoKRSlK4pfKTLisInsvG3Tluh4jCVgp+NbWXX+5/5ZnOWeusM+KE4KrC0miXk6k2Q/w2N088N2PI2Olp10qLy4h8PtRxLtbCsiMs2jocLwamAvjqWa/5mZcS3Iojo0bnH4R878M8TpTaiGOk5nkAjqvEINh52Wxq1sVyJlEYsnS4OsSW4AkZHCEofS/WN3Yup0ThFC+WuHglL8GY5bXsCZjyGTSNjYnCVgq69nL9P6pgGz8ZrLeceuEtq44SCvFrnHsDwZlc7VQJPyVu4428aaZwlG2Glt92KDmUpfZZkIfg08iYiotIROqNmON33v93GXW17VpxkE1XrbwIVX+wy+GJQT7an/Xi7du3LvPS5jnNhT2xGJV5yd6HDVnfeWS7IUuZrY/7/a+LWhnBZPXhRF7go5/vxf39fY1yAcAzgSQrAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKCIbojy8g3Gdnbc5GwG8tLA97HOCfc0xuTsCdjkhHpKWGjfHvQ7uVfvpqfMsjmyUtXL3gsT2fxyJ/s+quRqiJxbUJxKP/P5b0r2XUg49dCQ6ujR617+wovIduaNV6857fPtmVN7KYL6zaqDIM9iWK9uP1LnfYL+nRxfkp3d1cVD+VSYc2Get6+SWGVv0Mh9OlNWR9jKvaIPOuAU4c6kL1IJnwvu1fmcA8uWPKFZBsMqs+4+BRtxipB22gQbd2wW4uz9/4XPv5Py9u5SHJm38004EGQQLzM2KfWWMXzmVNKaSBLZ910Hwkp7LDN3pG4lD2r4nFYM/uH9KplUV9Ix+rs+f3rpfXguHSS3gV9LJqBYWqqilNKSsOK32L2kUkuTd7xLJM4sEYRGnnMdS4U1sGyvuqwUef7fC+rOdp6brjRdGcSSeZx2tGmsvKXPb7/royTPmQ0ZxB8Lzhn5KH/TxZhkMtG69V6kuVvU7Zj5PdJWY3fYnvjZnNvwjSFvrBsRC5fpeREoy2djzKZnCvC1Y5CGueXsvfrM/21H9pmzoLFeZR6i8SHyuxN5Tlcfx6LgfdOhrrKFxExbExEst7V2LdOGEzF9/bINshR6pndDM/x0PX+Yg+AXaZpUn+n6zLceur7vW/12WDLXUq/uOjdd9q+z54vcTZAJfI+EZf3FS2HQyMvEeHV5O+Q8iD6cT2EVpJeKmd+uAq/EFPMzw1z1pJxad5gwy4iZuOhJBLLpModk//lv3q/O+yotcS8niG7w5eTB6yxbCukUYef+1NEhW6mzpcx/h26/Da2EW69TPlgLXWZuglTbhNO2RSoNup8zI7iP31eS9R2xZFwilHAqeCP1atvcP7ksR7xqEFrWtzI1CMtpy7FySYamEqyX0iH9irNzykXq7SPzrS/er07NwIyikUYdkxm4WuO5A0Rr3a+HRTBAr1MNbtvGfj60s0ashK28zf00ZVUPdxGB2Xq/KslbOJSwDmOC4JfRfhb248mOfvfwy7mTAZ8q53pKC+YoUgm5nSE8rdaMONrKJ8fzexbpVCeRsvcO6kQyjFC9p0xD57fBLvc0oBGEVsIykkl4qLWQYu6zK/z++SVnJUlOgPatpvHpsxPIW99vi4Mn/j2KDK6sgS0puvzKG6r8odMpZ/ClTvp1XGd26POMI8Zuc8Uyx2se8Vb78+1J09/FrASvnsJMwjWyB7vvDVO5TZrrM5IhquSF1Xr9+rgn/dlYxpQzC5m6dVk8ey/EvTiFwg6ZfW1Hwc4CX8auUiesdR/H5JmrPaZOjLtnJbh/1LAWMtu5qXm8eiYlgzq89myuqeREiZHPSrJxzxnReOYd5eZ+QkHIPVBmIysa/o8/Hz6W5Zqc4Je7yL22wTUfgzz+UzLZXLvHSnCE/y997r52bmStfm4TuaReY4FNs+CdUXowjsK3fe5Z+JFjuIdWXO/hFCHSkffeXvKWWnlvwr5VEafMe+LhHZXv7mVPuO6N9hPHaelA8qdhUyZGDa2ETYfYbb2BXMu34Np5NdMxAeF3XBRYj8qknljAxpQzl6uEE34vUO5lZA6T6+QKr+vzhNuCvXEn6HhsxEIYXfERsRh8qpR49kMzeKozE/26O5Ul36p0xCW8dkf6Bz9hvZWIXFc7NzMKgpsG+wffvMt5C0sQn3JQRi5TlmTPfcM+E1tm9FmOCEaLYseWrFjs/cRcAC9lMPp57F/3RHO5N7LvTNv1vUm8gi2CDvOqK2JwIDUH7lwHp4bz6499S7xWOHIjD4Ux53JmRzkm2vlY2nnOw2jDem1T/UwGd9iPY76PcCBH/SMdQqz+VsTLr6dTiQVKltOO0dri4XCOxssgXvqdV0FrWWlw0XRh5FdTupYrB1003n2cMHTuCfA46zB53SYS/y0X+gb2SPgKYif59lkzXWULURt2pH4/BSGuNuzbHfV1I4fFnHsRjQ9ls/XYJ8iRzrnLdPT5wl+8EhFp52OvnSe3GORQH39p+ZVMmVYS+PVQBm/zWSicXzpiQZbBGHgrgXMrd72IengG6rZjar4MjkN865XTRTSeeBGN7rvPM8dMEUfN99OJ3gcRZ85J1PS8tD4MPHVoEZzxnysMpwUbZXLM8Nx7fcqY4uSWbR0KjA1GiQSS5bRBTmh42NlXOZGX8mJw5RnkW0gIw9lMKzoXQQjxsZsq9fTr266XnYh4OF7eijik7hn9UO53EURTHntTui5eibhXDbD6tvogjf1TzttVsG+bnzs6V+qcfZ9FMO+LTSVuBhyKuhMPd0ysYnPdPj50RJANKdtt17KjmNwfCg5A3UobdArCCCuhifgSYsFhvWVNTCUmD2YS4bkobPdPqZ2szffx8j6zrWw7/ZQRTRk7kq6vnLX9T3fRE6LE9HF7sn0TeuvixPv2nXsmWZPa09017/KvL8jNkPwu7365+Q96z9IsLFuTk68g2E9/HpigTlSyzoUM2qEZkNdgEazgqKlPcP9NypKI1HtRWZr96V7y+yJ/e+adCu2vnO2Cfp3t9Ja2Wnhnmbq22nrtVGRdeQcoDyqnTDuc7+aqp032ruXYOABQkI4NABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBABSIAgAoEAUAUCAKAKBAFABAgSgAgAJRAAAFogAACkQBAL7TNM3/A8t2GkN56NGDAAAAAElFTkSuQmCC"/>
              </div>
              <div class="login-box">
                <div  class="login-form" v-if="!isForgeted">    
                  <el-form :label-position="labelPosition"  ref="loginForm" :model="loginForm" :rules="rules" >
                     <!-- <el-form-item  prop="value">
                        <el-input v-model="loginForm.value"  placeholder="单位组织" prefix-icon="el-icon-s-custom" ></el-input>
                      </el-form-item> -->
                      <el-form-item  prop="username">
                        <el-input v-model="loginForm.username" autocomplete = "new-password" placeholder="邮箱" prefix-icon="el-icon-user"></el-input>
                      </el-form-item>
                      <el-form-item  prop="password">
                        <el-input type="password" v-model="loginForm.password" autocomplete = "new-password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
                      </el-form-item>
                                             
                  </el-form> 
                  <div class="login-tools"> 
                      <el-checkbox v-model="login_auto">自动登陆</el-checkbox> 

                      <p><el-link :underline="false" @click="forgetPwd">忘记密码</el-link></p>
                  </div> 
                  <el-button type="primary" @click="loginSubmit" class="button-400">登陆</el-button>
                </div>  
                <div  class="forget-form" v-else>    
                  <el-form :label-position="labelPosition"  ref="forgetForm" :model="forgetForm" :rules="rules" >
                     <el-form-item  prop="email">
                      <el-input v-model="forgetForm.email"  placeholder="邮箱" prefix-icon="el-icon-message" ></el-input>
                      </el-form-item>
                      <el-form-item  prop="code">
                         <el-row>
                          <el-col :span="14">
                              <el-input  v-model="forgetForm.code" autocomplete="off" prefix-icon="el-icon-key"></el-input>
                          </el-col>
                          <el-col :span="8" :offset="2">
                              <el-button size="small" type="primary" @click="getCheckCode" :disabled="startCountDown">{{startCountDown ? `获取邮箱验证码(${countDown})`:'获取邮箱验证码'}}</el-button>
                          </el-col>
                      </el-row>
                      </el-form-item>
                      <el-form-item  prop="password">
                        <el-input type="password" v-model="forgetForm.password" auto-complete="off"  placeholder="新密码" prefix-icon="el-icon-lock"></el-input>
                      </el-form-item>
                                             
                  </el-form> 
                  <div class="login-tools"> 
                     <p><el-link :underline="false" @click="back">账户登陆</el-link></p>
                  </div> 
                  <el-button type="primary" @click="submitForm('loginForm')" class="button-400"> 提交</el-button>
                </div>  
              </div>  
          </el-main>
        
        
        </el-container>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
   data() {
     var validateEmail = (rule, value, callback) => {
       alert(1)
        let reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
        if (value === '') {
          callback(new Error('请输入邮箱123'));
        } else if (!reg.test(value)) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        loginForm: {
          username: '',
          password: '',
        },
        forgetForm:{
          email:'',
          code:'',
          password:''
        },
        login_auto:true,
        rules: {
          email:[
              {required:true,message:'请输入邮箱',trigger:'blur'},
              { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          username:[
             { required: true, message:  '请输入登陆邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message:  '请输入密码', trigger: 'blur' }
          ] ,
          code:[
              { required: true, message:  '请输入验证码', trigger: 'blur' }
          ]  ,     
        },
        isForgeted:false,
        startCountDown:false,
        countDown:60,
        intervalId:null
      };
    },
   computed:{

    ...mapState({  
         language:state=>state.language                                                 
      }),

  },

    methods: {
      ...mapMutations([
        'setLoginName',
        'setTOKEN',
        'setGroupName',
        'setUserType'
      ]),

      loginSubmit() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
                   
            // this.$API.login(this.loginForm).then((res) => {
            //    console.log(res)
            //    if(res.data.errorcode === 0){
                  
            //    }else{
            //       this.setLoginName(this.loginForm.username)
            //       this.setGroupName(this.loginForm.username === 'root' ? '奥比智影':'学布思教育有限公司')
            //       this.setUserType(this.loginForm.username)
            //       this.setTOKEN("res.data.token")
            //       this.$router.push({ path: '/home' })
            //    }       
            // })

               this.setLoginName(this.loginForm.username)
               this.setGroupName(this.loginForm.username === 'root' ? '奥比智影':'学布思教育有限公司')
               this.setUserType(this.loginForm.username)
               this.setTOKEN("res.data.token")
               this.$router.push({ path: '/home' })
                       
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      forgetPwd(){
        this.isForgeted = true
        this.forgetForm  ={
          email:'',
          code:'',
          password:''
        }
      },

      getCheckCode(){
         let that = this 
          clearInterval(that.intervalId)
          that.startCountDown = true 
          that.countDown = 10
          that.intervalId = setInterval(() => {
              if(that.countDown  > 0){
                that.countDown --
                console.log(`获取邮箱验证码(${that.countDown})`)
              }else{
                 that.startCountDown = false
                  clearInterval(that.intervalId)
              }
          },1000) 
      },

      resetPwdSubmit(){
          this.$refs['forgetForm'].validate((valid) => {
          if (valid) {
            

            
            // this.$API.login(this.loginForm).then((res) => {
            //    console.log(res)
            //    if(res.data.status === 'N'){
            //       this.$alert(this.$t('text.login_err_txt'), this.$t('text.system_tips'), {
            //          confirmButtonText: this.$t('btn.sure')
            //       })
            //       return false;
            //    }else{
            //       this.setLoginName(this.loginForm.username)
            //       this.setUserType(res.data.userType)
            //       this.setTOKEN(res.data.token)
            //       this.$router.push({ path: '/home' })
            //    }
               
            // })

              //  this.setLoginName(this.loginForm.username)
              //  this.setTOKEN("res.data.token")
              //  this.$router.push({ path: '/home' })
                       
          } 
        });
      },

      back(){
        clearInterval(this.intervalId)
        this.isForgeted = false
        this.loginForm = {
          username: '',
          password: '',
        }
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .login-box{
        display: flex;
        align-items: center;
        justify-content: center; 
        height: calc(100vh - 245px);
  }
  .login-form,.forget-form{
    width: 400px;
    padding: 40px;
    border-radius: 30px;
    background-color: #fff;
  }
  el-form{
      margin-right: 30px;
      margin-top: 30px
  }

  .el-form-item:last-child{margin-bottom: 0px;}

  .content{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    bottom: 0;
    right: 0;
    margin: auto;
    background-image: url(../assets/img/login-bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-tools{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .button-400{
    width: 400px;
  }

</style>
