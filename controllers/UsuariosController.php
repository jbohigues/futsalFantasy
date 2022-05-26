<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Usuarios;
use yii\filters\VerbFilter;
use app\models\UsuariosSearch;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;

/**
 * UsuariosController implements the CRUD actions for Usuarios model.
 */
class UsuariosController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                // 'only' => ['create','delete','update'],
                'rules' => [
                    ['allow' => false,
                     'actions' => ['index', 'view', 'create','update','delete'],
                     'roles' => ['?'], 
                    ],
                    // ['allow' => true,
                    //  'actions' => ['index','create','update','delete'],
                    //  'roles' => ['?'], 
                    // ],
                    ['allow' => true,
                     'actions' => ['index', 'view', 'create','update','delete'],
                     'matchCallback' => function ($rule, $action) {
                                           return Yii::$app->user->identity->hasRole('A');
                                        }
 
                    ],
                    ['allow' => true,
                     'actions' => ['update'],
                     'matchCallback' => function ($rule, $action) {
                                           return !Yii::$app->user->isGuest && 
                                              Yii::$app->user->identity->estado=="A"; //Un usuario identificado y de alta
                                        }
 
                    ],
 
                ],
            ],
        ];
    }

    /**
     * Lists all Usuarios models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new UsuariosSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Usuarios model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Usuarios model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Usuarios();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Usuarios model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $user=Yii::$app->user->identity;
        if(!$user->hasRole("A") && $id!=$user->id)  //Si el usuario no es administrador solamente puede acceder a sus datos
            throw new UnauthorizedHttpException('Acceso no permitido');

        $model = $this->findModel($id);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }  

    /**
     * Deletes an existing Usuarios model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id ID
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Usuarios model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return Usuarios the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Usuarios::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
