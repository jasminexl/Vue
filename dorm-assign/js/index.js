new Vue({
    el: '#app',
    data: function () {
        return {
            show: {
                visible: false
            },
            activeIndex: '1',
            activeIndex2: '1',
            tabname: 'self',
            form: {
                stu_id: '',
                stu_name: '',
                self_origin: '',
                req_origin: '',
                self_character: '',
                req_character: '',
                self_hobby: '',
                req_hobby: '',
                self_plan: '',
                req_plan: '',
                self_sleep: '',
                req_sleep: '',
                self_dormitory: '',
                req_dormitory: '',
                self_merit: '',
                req_merit: ''
            },
            newForm: {
                stu_id: '',
                stu_name: '',
                self_origin: '',
                req_origin: '',
                self_character: '',
                req_character: '',
                self_hobby: '',
                req_hobby: '',
                self_plan: '',
                req_plan: '',
                self_sleep: '',
                req_sleep: '',
                self_dormitory: '',
                req_dormitory: '',
                self_merit: '',
                req_merit: ''
            },
            rules: {
                notnull: [
                    { required: true, message: '不可为空', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleSelect: function(key, keyPath) {
            console.log(key, keyPath);
        },
        back: function () {
            this.tabname = 'self'
        },
        next: function () {
            this.tabname = 'req'
            // this.$refs['formSelf'].validate(function (valid) {
            //     if (valid) {
            //         alert("ssssss")
            //     } else {
            //         alert("nnnnnnnnnnnn")
            //         return false
            //     }
            // })
        },
        onSubmit: function() {
            var self = this
            if (this.notNull(self.form)) {
                axios.post("http://localhost:9131/dormassign/attributes/save", self.form)
                    .then(function (res) {
                        console.log(res)
                        if (res.data.code == '0') {
                            self.$message({
                                message: '提交成功，请耐心等待宿舍分配结果',
                                type: 'success'
                            });
                        } else {
                            self.$message({
                                message: '提交失败，请重新输入',
                                type: 'error'
                            });
                        }
                        self.reset()
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        },
        reset: function () {
            this.form = this.newForm
            this.$message({
                message: '提交成功，请耐心等待宿舍分配结果',
                type: 'success'
            });
        },
        resetForm: function(formName) {
            this.$refs[formName].resetFields();
        },
        notNull: function (form) {
            for (value in form) {
                console.log(value)
                if (!form.value) {
                    this.$message({
                        message: '输入信息不完整',
                        type: 'error'
                    });
                    console.log("false")
                    return false
                }
            }
            return true
        }
    }
})