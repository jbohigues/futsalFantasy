<?php

namespace app\controllers;

use app\models\Jugadoresrealesencadaliga;
use app\models\JugadoresrealesencadaligaSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * JugadoresrealesencadaligaController implements the CRUD actions for Jugadoresrealesencadaliga model.
 */
class JugadoresrealesencadaligaController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Jugadoresrealesencadaliga models.
     *
     * @return string
     */
    public function actionIndex()
    {
        $searchModel = new JugadoresrealesencadaligaSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Jugadoresrealesencadaliga model.
     * @param int $idJugadorReal Id Jugador Real
     * @param int $idLiga Id Liga
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($idJugadorReal, $idLiga)
    {
        return $this->render('view', [
            'model' => $this->findModel($idJugadorReal, $idLiga),
        ]);
    }

    /**
     * Creates a new Jugadoresrealesencadaliga model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Jugadoresrealesencadaliga();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'idJugadorReal' => $model->idJugadorReal, 'idLiga' => $model->idLiga]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Jugadoresrealesencadaliga model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $idJugadorReal Id Jugador Real
     * @param int $idLiga Id Liga
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($idJugadorReal, $idLiga)
    {
        $model = $this->findModel($idJugadorReal, $idLiga);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'idJugadorReal' => $model->idJugadorReal, 'idLiga' => $model->idLiga]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Jugadoresrealesencadaliga model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $idJugadorReal Id Jugador Real
     * @param int $idLiga Id Liga
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($idJugadorReal, $idLiga)
    {
        $this->findModel($idJugadorReal, $idLiga)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Jugadoresrealesencadaliga model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $idJugadorReal Id Jugador Real
     * @param int $idLiga Id Liga
     * @return Jugadoresrealesencadaliga the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($idJugadorReal, $idLiga)
    {
        if (($model = Jugadoresrealesencadaliga::findOne(['idJugadorReal' => $idJugadorReal, 'idLiga' => $idLiga])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
