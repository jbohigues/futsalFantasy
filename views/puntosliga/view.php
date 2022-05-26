<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Puntosliga */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Puntosligas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="puntosliga-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'idLiga',
            'titular',
            'golDL',
            'golMC',
            'golDF',
            'golPT',
            'primeraAmarilla',
            'segundaAmarilla',
            'rojaDirecta',
            'malPartido',
            'noJuegaPartido',
            'buenPartido',
            'excelentePartido',
            'perfectoPartido',
        ],
    ]) ?>

</div>
